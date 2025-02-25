// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./BaseballToken.sol";
import "./LiquidityPool.sol";
contract BaseballTokenRouter {

    LiquidityPool liquidityPool;
    BaseballToken baseballToken;

    constructor (LiquidityPool _liquidityPool, BaseballToken _baseballToken){
        liquidityPool = _liquidityPool;
        baseballToken = _baseballToken;
    }

    //유동성 추가 
    function addLiquidity(uint256 _tokenAmount) external payable {
        require(baseballToken.balanceOf(msg.sender) > 0, "NO_AVAILABLE_TOKENS");
        //user->router approve 필요
        baseballToken.transferFrom(msg.sender, address(this), _tokenAmount); //Router get Token

        baseballToken.transfer(address(liquidityPool), _tokenAmount); //Router transfer to pool

        //user->pool approve 필요
        liquidityPool.deposit{value: msg.value}(_tokenAmount, address(0), msg.sender);
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
}