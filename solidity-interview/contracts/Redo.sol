// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Redo {
   IERC721 nft;
   uint nftId;
   address owner;

   bool started;
   bool ended;
   uint endAt;

   uint highestBid;
   address highBidder;
   mapping(address => uint) bids;

   event Start(address indexed from);
   event Bid(address indexed from);
   event Withdraw(address indexed from, uint amount);
   event End(address indexed from);

   constructor(address _nft, uint _nftId) {
      nft = IERC721(_nft);
      nftId = _nftId;
      owner = msg.sender;
   }

   function start() public {
      require(owner == msg.sender, 'not owner');
      require(!started, 'started');
      started = true;
      endAt = block.timestamp + 7 days;
      nft.transferFrom(owner, address(this), nftId);
      emit Start(msg.sender);
   }

   function bid() public payable {
      require(started, 'not started');
      require(block.timestamp < endAt, 'ended');
      require(msg.value > highestBid, 'not the highest value');
      if (highBidder != address(0)) {
         bids[highBidder] += highestBid;
      }
      highBidder = msg.sender;
      highestBid = msg.value;

      emit Bid(msg.sender);
   }

   function withdraw() public {
      uint amount = bids[msg.sender];
      if (amount > 0) {
         bids[msg.sender] = 0;
         bool sent = payable(msg.sender).send(amount);
         require(sent, 'failed to withdraw');
         emit Withdraw(msg.sender, amount);
      }
   }

   function end() public {
      require(owner == msg.sender, 'not owner');
      require(started, 'not started');
      require(block.timestamp >= endAt, 'not ended');
      ended = true;
      if (highBidder != address(0)) {
         nft.transferFrom(address(this), highBidder, nftId);
         bool sent = payable(owner).send(highestBid);
         require(sent, 'failed to pay owner');
      } else {
         nft.transferFrom(address(this), owner, nftId);
      }
      emit End(msg.sender);
   }
}
