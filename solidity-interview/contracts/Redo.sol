// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Redo {
    IERC721 nft;
    uint256 tokenId;

    address owner;

    bool started;
    uint256 endAt;

    constructor(address _nft, uint256 _tokenId) {
        nft = IERC721(_nft);
        tokenId = _tokenId;
        owner = msg.sender;
    }

    function start() public {
        require(msg.sender == owner, 'not owner');
        require(!started, 'started');
        started = true;
        endAt = block.timestamp + 7 days;
        nft.transferFrom(msg.sender, address(this), tokenId);
    }
}
