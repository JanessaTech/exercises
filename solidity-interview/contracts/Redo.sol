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

    address highestBidder;
    uint256 highestBid;
    mapping(address => uint256) bids;

    event Withdraw(address indexed from, uint256 amount);

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

    function bid() public payable{
        require(started, 'not started');
        require(block.timestamp < endAt, 'ended');
        require(msg.value > highestBid, 'msg.value <= highestBid');
        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }
        highestBid = msg.value;
        highestBidder = msg.sender;
    }

    function withdraw() public {
        uint256 amount = bids[msg.sender];
        require(amount > 0, 'no money left');
        bids[msg.sender] = 0;
        bool sent = payable(msg.sender).send(amount);
        require(sent, 'failed to withdraw');
        emit Withdraw(msg.sender, amount);
    }

    function end() public {
        require(msg.sender == owner, 'not owner');
        require(started, 'not started');
        require(block.timestamp >= endAt, 'not ended');
        if (highestBidder != address(0)) {
            nft.transferFrom(address(this), highestBidder, tokenId);
            bool sent = payable(owner).send(highestBid);
            require(sent, 'failed to pay owner');
        } else {
            nft.transferFrom(address(this), owner, tokenId);
        } 
    }
}
