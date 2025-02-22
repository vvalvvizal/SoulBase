// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./AchievementSBT.sol";

contract SBTMinter{
    AchievementSBT public sbt;
    address public owner;

    modifier onlyOwner (){
        require(msg.sender == owner, "ONLY_OWNER");
        _;
    }

    constructor(address _sbtAddress){
        owner = msg.sender;
        sbt = AchievementSBT(_sbtAddress);
    }

    function sbtMinter(address to, string memory CID) public onlyOwner {
        sbt.Mint(to, CID);
    }
}