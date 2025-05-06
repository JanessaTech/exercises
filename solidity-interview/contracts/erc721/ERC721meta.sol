// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // 元数据扩展

contract ERC721Meta is ERC721, ERC721URIStorage {
    uint256 cnt;

    constructor() ERC721("MyNFT", "MNFT") {}
    function _baseURI() internal pure override returns (string memory) {
        return "http://test.com/";
    }

    // 必须重写以解决多重继承冲突
    function tokenURI(uint256 tokenId) 
        public view override(ERC721, ERC721URIStorage) 
        returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage)
        returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    function safeMint(address to, string memory tokenURI_) public {
        uint256 tokenId = cnt;
        cnt++;
        _safeMint(to, tokenId); // 内置安全检查（如目标地址是否为合约且实现onERC721Received）
        _setTokenURI(tokenId, tokenURI_); // 关联元数据
    }
}