// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./AchievementSBT.sol";

contract SBTMinter{
    AchievementSBT public sbt;

    constructor(address _sbtAddress){
        sbt = AchievementSBT(_sbtAddress);
    }

    function sbtMinter() public {
        address minter = address(this);
        sbt.Mint(minter, "ipfs://QmbJHzd3NyGA5cVw4iJN8VffXLH2eBojYGzeztkRzg1jca");

    }
}