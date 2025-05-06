// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // 元数据扩展
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Redo is ERC721, ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor() ERC721('ERC721','ERC721') {}

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) 
        public view override(ERC721, ERC721URIStorage) 
        returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _baseURI() internal pure  override returns (string memory) {
        return "http://test.com/";
    } 

    function getNextTokenId() external view returns(uint256) {
        return _nextTokenId;
    }

    function safeMint(address to, string memory _tokenURI) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }
}
