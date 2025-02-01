// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MyERC20 is ERC20{

    address public owner;
    uint public MAX_SUPPLY;//토큰 발행량 

    constructor( ) ERC20("My ERC20 Token", "MyERC20"){
        MAX_SUPPLY = 1000000 * 10**decimals();
        _mint(address(this), MAX_SUPPLY );//배포 시에 MAX_SUPPLY 만큼 발행
        owner = msg.sender;
    }

    function mint(address account, uint256 amount) external{
        _mint(account, amount);
    }
    
}