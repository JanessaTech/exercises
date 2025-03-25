// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract Redo {
   IERC721 nft;
   uint nftId;
   address owner;

   bool started;
   bool ended;
   uint endAt;

   uint highestBid;
   address highestBidder;
   mapping(address => uint) bids;

   event Start(address indexed from);
   event End(address indexed from);
   event Bid(address indexed from, uint amount);
   event Withdraw(address indexed from, uint amount);

   constructor(address _nft, uint _nftId) {
      nft = IERC721(_nft);
      nftId = _nftId;
      owner = msg.sender;
   }

   function start() public {
      require(!started, 'started');
      require(owner == msg.sender, 'not owner');
      started = true;
      endAt = block.timestamp + 7 days;
      nft.transferFrom(msg.sender, address(this), nftId);

      emit Start(msg.sender);
   }

   function end() public {
      require(msg.sender == owner, 'not owner');
      require(started, 'not started');
      require(block.timestamp >= endAt, 'not ended');
      ended = true;
      if (highestBidder == address(0)) {
         nft.transferFrom(address(this), owner, nftId);
      } else {
         nft.transferFrom(address(this), highestBidder, nftId);
         bool sent = payable(owner).send(highestBid);
         require(sent, 'failed to send eth to owner');
      }

      emit End(msg.sender);
   }

   function bid() public payable {
      require(started, 'not started');
      require(block.timestamp < endAt, 'already ended');
      require(msg.value > highestBid, 'msg.value <= highestBid');

      if (highestBidder != address(0)) {
         bids[highestBidder] += highestBid;
      }
      highestBid = msg.value;
      highestBidder = msg.sender;

      emit Bid(msg.sender, msg.value);
   }

   function withdraw() public {
      uint balance = bids[msg.sender];
      bids[msg.sender] = 0;
      bool sent = payable(msg.sender).send(balance);
      require(sent, 'failed to withdraw eth');
      emit Withdraw(msg.sender, balance);
   }
}
