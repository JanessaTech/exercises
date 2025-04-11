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

    uint highestBid;
    address highestBidder;
    mapping(address => uint) bids;

    event Start(address indexed from);
    event Bid(address indexed from, uint amount);
    event Withdraw(address indexed from, uint amount);
    event End(address indexed from);

    constructor(address _nft, uint256 _nftid) {
        nft = IERC721(_nft);
        nftid = _nftid;
        owner = msg.sender;
    }

    function start() public {
        require(owner == msg.sender, 'not owner');
        require(!started, 'started');
        started = true;
        endAt = block.timestamp + 7 days;
        nft.transferFrom(msg.sender, address(this), nftid);

        emit Start(msg.sender);
    }

    function bid() public payable {
        require(started, 'not started');
        require(block.timestamp < endAt, 'ended');
        require(msg.value > highestBid, 'msg.value <= highestBid');
        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }
        highestBid = msg.value;
        highestBidder = msg.sender;

        emit Bid(msg.sender, msg.value);
    }

    function withdraw() public {
        uint amount = bids[msg.sender];
        if (amount > 0) {
            bool sent = payable(msg.sender).send(amount);
            require(sent, 'failed to withdraw');
            emit Withdraw(msg.sender, amount);
        }
    }

    function end() public {
        require(owner == msg.sender, 'not owner');
        require(started, 'not started');
        require(block.timestamp >= endAt, 'not ended');
        if (highestBidder == address(0)) {
            nft.transferFrom(address(this), owner, nftid);
        } else {
            nft.transferFrom(address(this), highestBidder, nftid);
            bool sent = payable(owner).send(highestBid);
            require(sent, 'failed to pay off owner');
        }
        emit End(msg.sender);
    }

}
