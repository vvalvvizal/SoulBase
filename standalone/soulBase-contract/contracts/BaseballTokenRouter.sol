// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./BaseballToken.sol";
import "./LiquidityPool.sol";
contract BaseballTokenRouter is Initializable, UUPSUpgradeable, OwnableUpgradeable{

    LiquidityPool liquidityPool;
    BaseballToken baseballToken;
    uint256 internal constant VERSION = 3;


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
        //user->router approve 필요
        baseballToken.transferFrom(msg.sender, address(this), _tokenAmount); //Router get Token

        baseballToken.transfer(address(liquidityPool), _tokenAmount); //Router transfer to pool

        //user->pool approve 필요
        liquidityPool.deposit{value: msg.value}(_tokenAmount, msg.sender);
    }

    //유동성 제거 
    function pullLiquidity() external{
        liquidityPool.withdraw(msg.sender);

    }
    //토큰 교환 ETH -> BBT
    function swapTokens(uint256 _tokenAmount) external payable{
        //user -> router approve 필요
       baseballToken.transferFrom(msg.sender, address(liquidityPool),_tokenAmount);
        liquidityPool.swap{value:msg.value}(_tokenAmount, msg.sender);
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}