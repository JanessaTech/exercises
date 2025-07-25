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

   address highestBider;
   uint256 hightestBid;
   mapping(address => uint256) bids;

   event Start(address indexed from);
   event Bid(address indexed from, uint256 amount);
   event Withdraw(address indexed from, uint256 amount);
   event End(address indexed from);

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
      emit Start(msg.sender);
   }

   function bid() public payable{
      require(started,'not started');
      require(block.timestamp < endAt, 'ended');
      require(msg.value > hightestBid, 'msg.value <= hightestBid');
      if (highestBider != address(0)) {
         bids[highestBider] += hightestBid;
      }
      highestBider = msg.sender;
      hightestBid = msg.value;
      emit Bid(msg.sender, msg.value);
   }

   function withdraw() public {
      uint256 amount = bids[msg.sender];
      require(amount > 0, 'no eth');
      bids[msg.sender] = 0;
      (bool success, ) = payable(msg.sender).call{value: amount, gas: 2300}('');
      require(success, 'failed to withdraw');
      emit Withdraw(msg.sender, amount);
   }

   function end() public {
      require(msg.sender == owner, 'not ower');
      require(started, 'not started');
      require(block.timestamp >= endAt, 'not ended');
      if (highestBider != address(0)) {
         nft.transferFrom(address(this), highestBider, tokenId);
         bool sent = payable(owner).send(hightestBid);
         require(sent, 'failed to pay owner');
      } else {
         nft.transferFrom(address(this), owner, tokenId);
      }

      emit End(msg.sender);
   }
}