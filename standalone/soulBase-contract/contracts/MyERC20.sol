// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MyERC20 is ERC20{


    constructor( ) ERC20("My ERC20 Token", "MyERC20"){

    }
    
}