// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Redo {
    IERC721 nft;
    uint256 nftid;
    address owner;

    bool started;
    bool ended;
    uint endAt;

    event Start(address indexed from);

    constructor(address _nft, uint256 _nftid) {
        nft = IERC721(_nft);
        nftid = _nftid;
        owner = msg.sender;
    }

    function start() public {
        require(owner == msg.sender, 'not owner');
        require(!started, 'started');
        started = true;
        nft.transferFrom(msg.sender, address(this), nftid);

        emit Start(msg.sender);
    }

    function bid() public payable {

    }

    function  withdraw() public {
        
    }

    function end() public {

    }

}
