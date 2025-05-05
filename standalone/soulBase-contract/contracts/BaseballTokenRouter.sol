// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./BaseballToken.sol";
import "./LiquidityPool.sol";
contract BaseballTokenRouter is Initializable, UUPSUpgradeable, OwnableUpgradeable{

    LiquidityPool liquidityPool;
    BaseballToken baseballToken;
    uint256 internal constant VERSION = 5;


    function initialize(LiquidityPool _liquidityPool, BaseballToken _baseballToken) public initializer{
        __Ownable_init();
        __UUPSUpgradeable_init();
       liquidityPool = _liquidityPool;
        baseballToken = _baseballToken;
    }

    function userAmount() external view returns(uint256){
        return baseballToken.balanceOf(msg.sender);
    }   
        //upgrade용
    function version() public pure returns (uint256) {
            return VERSION;
    }

    //유동성 추가 
    function addLiquidity(uint256 _tokenAmount) external payable {
        require(baseballToken.balanceOf(msg.sender) > 0, "NO_AVAILABLE_TOKENS");
        //bbt에 대해 user->router approve 필요
        baseballToken.transferFrom(msg.sender, address(this), _tokenAmount); //Router get Token

        baseballToken.transfer(address(liquidityPool), _tokenAmount); //Router transfer to pool

        //내부적으로 bbt에 대해 user->pool approve
        liquidityPool.deposit{value: msg.value}(_tokenAmount, msg.sender);
    }

    //유동성 제거 
    function pullLiquidity() external{
        liquidityPool.withdraw(msg.sender);

    }
    //토큰 교환
    function swapTokens(uint256 _tokenAmount, uint256 _minAmountOut) external payable {
        if (msg.value > 0) {
            // ETH → BBT: ETH만 풀로 이동
            liquidityPool.swap{value: msg.value}(0, msg.sender, _minAmountOut); // 0은 BBT 안 보내는 의미
        } else {
            // BBT → ETH: BBT를 풀로 넘김
            //bbt에 대해 user->router approve 필요
            baseballToken.transferFrom(msg.sender, address(liquidityPool), _tokenAmount);
            liquidityPool.swap( _tokenAmount, msg.sender, _minAmountOut);
        }
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}