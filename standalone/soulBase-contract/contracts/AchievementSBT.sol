// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "erc5192/src/ERC5192.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AchievementSBT is ERC5192,Ownable{
  bool private isLocked;
  uint256 private _tokenIds;
  address public sbtRouter;
  mapping(uint256 => string) private _tokenURIs;

  event SBTMinted(address to, uint256 tokenId, string metadataJSON_url);
  event SBTUpdated(uint256 tokenId, string beforeURL, string afterURL );
  event locked(uint256 tokenId);

  modifier onlyRouter() {
    require(msg.sender == sbtRouter, "ONLY_ROUTER");
    _;
  } 
  function setRouter(address _router) external onlyOwner {
      sbtRouter = _router;
  }

  constructor(string memory _name, string memory _symbol, bool _isLocked)
    ERC5192(_name, _symbol, _isLocked)
  {
    isLocked = _isLocked;
  }
  
  function Mint(address to, string memory _tokenURI) external onlyRouter {

    _tokenIds +=1;
    uint256 newTokenId = _tokenIds;

    _mint(to, newTokenId);
    _tokenURIs[newTokenId] = _tokenURI;

      emit SBTMinted(to, newTokenId, _tokenURI);

    if(isLocked) {
      emit locked(newTokenId);
      //emit Locked(newTokenId);
      }

  }
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
      require(_exists(tokenId), "AchievementSBT: URI query for nonexistent token");
      return _tokenURIs[tokenId];
  }
   function updateTokenURI(uint256 tokenId, string memory newTokenURI) external onlyRouter{
    require(_exists(tokenId), "AchievementSBT: URI for nonexistent token");

    string memory oldTokenURI = _tokenURIs[tokenId]; 
    _tokenURIs[tokenId] = newTokenURI;

    emit SBTUpdated(tokenId, oldTokenURI, newTokenURI); 
  }
    //isLocked가 true인 상태에서 실행되면 안되는 Trnasfer 구문
  function safeTransfer(address from, address to, uint256 tokenId) public {
    require(!isLocked, "AchievementSBT: Token is locked and cannot be transferred.");
    transferFrom(from, to, tokenId); // Calls ERC721's transferFrom
}

}