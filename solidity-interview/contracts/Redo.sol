// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Redo {
    IERC721 nft;
    uint nftId;
    address owner;

    uint highestBid;
    address highestBidder;
    mapping(address => uint) bids;

    bool started;
    bool ended;
    uint endAt;

    event Start(address indexed from);
    event Bid(address indexed from, uint amount);

    constructor(address _nft, uint _nftId) {
        nft = IERC721(_nft);
        nftId = _nftId;
        owner = msg.sender;
    }

    function start() public {
        require(owner == msg.sender, 'not owner');
        require(!started, 'started');
        nft.transferFrom(msg.sender, address(this), nftId);
        started = true;
        endAt = block.timestamp + 7 days;
        emit Start(msg.sender);
    }

    function bid() public payable {
        require(started, 'not started');
        require(block.timestamp < endAt, 'ended');
        require(msg.value >= highestBid, 'msg.value < highestBid');
        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }
        highestBid = msg.value;
        highestBidder = msg.sender;

        emit Bid(msg.sender, msg.value);
    }
}
