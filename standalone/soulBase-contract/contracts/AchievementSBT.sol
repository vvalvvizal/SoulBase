// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "erc5192/src/ERC5192.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract AchievementSBT is ERC5192{
  bool private isLocked;
  uint256 private _tokenIds;
  mapping(uint256 => string) private _tokenURIs;

  event SBTMinted(address to, string _tokenURI);

  constructor(string memory _name, string memory _symbol, bool _isLocked)
    ERC5192(_name, _symbol, _isLocked)
  {
    isLocked = _isLocked;
  }
  function Mint(address to, string memory _tokenURI) external {

    _tokenIds +=1;
    uint256 newTokenId = _tokenIds;

    _mint(to, newTokenId);
    _tokenURIs[newTokenId] = _tokenURI;

    emit SBTMinted(to, _tokenURI); //이벤트 발생

  //   if(isLocked){
  //     emit Locked(tokenId);
  // }
  }

    //isLocked가 true인 상태에서 실행되면 안되는 Trnasfer 구문
  function safeTransfer(address from, address to, uint256 tokenId) public {
    require(!isLocked, "AchievementSBT: Token is locked and cannot be transferred.");
    transferFrom(from, to, tokenId); // Calls ERC721's transferFrom
}
}