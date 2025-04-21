// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Redo {
    IERC721 nft;
    uint nftId;
    address owner;

    constructor(address _nft, uint _nftId) {
        nft = IERC721(_nft);
        nftId = _nftId;
        owner = msg.sender;
    }
}
