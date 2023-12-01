// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract AuctionNFTHouse is ERC721 {
    constructor() ERC721("AuctionNFTHouse", "MTK") {}

    function mint(address to, uint id) external {
        _mint(to, id);
    }
    function _baseURI() internal pure override returns (string memory) {
        return "https://janessatech.com/";
    }
}