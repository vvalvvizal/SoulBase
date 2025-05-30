// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./BaseballToken.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract LiquidityPool is Initializable, UUPSUpgradeable, OwnableUpgradeable, ERC20Upgradeable  {
    event LiquidityAdded(address indexed _account, uint256 _liquidity, uint256 _ethAmount, uint256 _tokenAmount);
    event LiquidityRemoved(address indexed _account, uint256 _liquidity, uint256 _ethAmount, uint256 _tokenAmount);
    event TradedTokens(address indexed _account, uint256 _ethTraded, uint256 tokenTraded);

    BaseballToken baseballToken;
    uint256 totalLiquidity;
    uint256 public ethReserve;
    uint256 public tokenReserve;
    uint32 lastBlockTimestamp;
    uint public constant SWAP_TAX = 1;// 0.01% swap tax
    mapping(address => uint256) liquidityProvided;
    uint256 internal constant VERSION = 6;


       
    function initialize(BaseballToken _baseballToken) public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        __ERC20_init("Liquidity Provider Token", "LP"); // ERC20 초기화 추가
        baseballToken = _baseballToken;
    }
    //upgrade용
    function version() public pure returns (uint256) {
            return VERSION;
    }


    function swap( uint256 _tokenAmount, address account, uint256 _minAmountOut) external payable{
      uint256 product = ethReserve * tokenReserve; //k
      uint256 amountToTransfer;
      uint256 amountToTake;
      uint256 totalAmountToTransfer; 
      uint256 _withTax;

      if(_tokenAmount != 0){ //요청에 bbt가 있다면
        //BBT -> ETH
        uint256 currentTokenBalance = baseballToken.balanceOf(address(this));
        
        if (baseballToken.isTaxOn()) {// bbt transfer 수수료가 켜져 있다면
            _withTax = _tokenAmount - ((baseballToken.TAX() * _tokenAmount) / 100);
        } else {
            _withTax = _tokenAmount;
        }
        uint256 addedBalance = tokenReserve + _withTax;

        require(addedBalance>=currentTokenBalance, "DID_NOT_TRANSFER");

        uint256 x = product / (tokenReserve + _withTax);
        amountToTransfer = ethReserve - x;

        amountToTake = (SWAP_TAX * amountToTransfer) / 100; //swap 수수료 1%
        totalAmountToTransfer = amountToTransfer - amountToTake;

        require(totalAmountToTransfer >= _minAmountOut, "SLIPPAGE_EXCEEDED");//슬리피지 최소 수령량 이하

        (bool success, ) = account.call{value: totalAmountToTransfer}("");//ETH 전송

        require(success, "ETH_TRANSFER_FAILED");
      }
      else{ //ETH -> BBT
        uint256 y = product / (ethReserve + msg.value);
        amountToTransfer = tokenReserve - y;

        amountToTake = (SWAP_TAX * amountToTransfer)/100; //swap 수수료 1%
        totalAmountToTransfer = amountToTransfer - amountToTake;
        require(totalAmountToTransfer >= _minAmountOut, "SLIPPAGE_EXCEEDED");

        baseballToken.transfer(account, totalAmountToTransfer);
      }

      emit TradedTokens(account, msg.value, _tokenAmount);


      _update(); //수수료를 유동성 풀에 추가
    }

    function deposit(uint256 tokenAmount, address account) external payable{
        require(msg.value > 0 && tokenAmount > 0, "Invalid deposit amounts");

        uint256 liquidity;
        uint256 totalSupply = totalSupply(); //현재 풀에 발행된 LPT

        ethReserve = address(this).balance - msg.value;
        tokenReserve = ERC20Upgradeable(baseballToken).balanceOf(address(this)) - tokenAmount;


        if(totalSupply==0){ //발행된 LP가 0개일 때 초기 유동성 계산
            liquidity = MathUpgradeable.sqrt(msg.value * tokenAmount); //msg.value는 ETH, tokenAmount는 BBT 수량
            //++ 초기 LPT 락업 있으면 악용 방지 가능 
        }
        else{
             liquidity = MathUpgradeable.min(
                (msg.value*totalSupply)/ethReserve, (tokenAmount * totalSupply)/tokenReserve
             );
            
        }

        require(liquidity>0,"INSUFFICIENT_LIQUIDITY_MINTED");

        super._mint(account,liquidity);
        liquidityProvided[account] += liquidity;
        totalLiquidity += liquidity;
        _update();
        emit LiquidityAdded(account, liquidity, msg.value, tokenAmount);
        
    }

    function withdraw(address account) external {
        uint256 liquidity = balanceOf(account);
        require(liquidity != 0, "NO_AVAILABLE_TOKENS");
        
        uint256 totalSupply = totalSupply();

        uint256 ethAmount = (ethReserve * liquidity) / totalSupply;
        uint256 tokenAmount = (tokenReserve * liquidity) / totalSupply;

        _burn(account, liquidity); //LP 토큰 소각
        liquidityProvided[account] -= liquidity;
        totalLiquidity -= liquidity;

        // ETH 전송
        (bool ethTransferSuccess, ) = account.call{value: ethAmount}("");
        require(ethTransferSuccess, "ETH_TRANSFER_FAILED");

        // Token 전송
        bool tokenTransferSuccess = ERC20Upgradeable(baseballToken).transfer(account, tokenAmount);
        require(tokenTransferSuccess, "TOKEN_TRANSFER_FAILED");


        emit LiquidityRemoved(account, liquidity, ethAmount, tokenAmount);
        _update();

    }

    //풀에 반영
    function _update() private {
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed;
        unchecked {
            timeElapsed = blockTimestamp - lastBlockTimestamp; // If new block, overflows
        }

        if (timeElapsed > 0) {
            ethReserve = address(this).balance;
            tokenReserve = ERC20Upgradeable(baseballToken).balanceOf(address(this));
            lastBlockTimestamp = blockTimestamp;
        }
    }
     function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

}