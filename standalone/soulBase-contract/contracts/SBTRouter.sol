// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./AchievementSBT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract SBTRouter is Ownable{
    AchievementSBT public sbt;

     constructor(address _sbtAddress) {
        sbt = AchievementSBT(_sbtAddress);
    }

    function mintSBT(address to, string memory CID) public onlyOwner {
        sbt.Mint(to, CID);
    }

      function updateTokenURI(uint256 tokenId, string memory newTokenURI) public onlyOwner {
        sbt.updateTokenURI(tokenId, newTokenURI);
    }
}
