// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract EnglishAuction  {
    IERC721 nft;
    address seller;
    uint256 nftId;
    
    uint256 highestBid = 0;
    address highestBidder = address(0);

    mapping(address => uint256) bids;

    bool started = false;
    bool ended = false;
    uint256 endAt = 0;

    event Start(address indexed owner);
    event Bid(address indexed from, uint256 bid);
    event Withdraw(address indexed from, uint256 amount);
    event End(address indexed owner);

    constructor(address _nft,  uint256 _nftId) {
        nft = IERC721(_nft);
        seller = msg.sender;
        nftId = _nftId;
    }

    function start() public {
        require(!started, 'started');
        require(msg.sender == seller, 'not owner');
        started = true;
        endAt = block.timestamp + 7 days;

        emit Start(msg.sender);
    }

    function bid() public payable {
        require(started, 'not start');
        require(msg.value > highestBid, 'value <= highestBid');
        require(block.timestamp < endAt, 'ended');

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBid = msg.value;
        highestBidder = msg.sender;

        emit Bid(msg.sender, msg.value);
    }

    function withDraw() public {
        uint256 balance = bids[msg.sender];
        bids[msg.sender] = 0;
        bool sent = payable(msg.sender).send(balance);
        require(sent, 'failed to withdraw');

        emit Withdraw(msg.sender, balance);
    }

    function end() public {
        require(started, 'not started');
        require(block.timestamp >= endAt, 'not ended');
        require(!ended, 'endeded');
        ended = true;

        emit End(msg.sender);

    }

}