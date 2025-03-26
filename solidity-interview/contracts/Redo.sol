// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Redo {
   IERC20 token;
   uint price;
   uint quantity;
   address owner;

   constructor(address _token, uint _price, uint _quantity, address _owner) {
      token = IERC20(_token);
      price = _price;
      quantity = _quantity;
      owner = _owner;
   }

   function buy(uint _quantity) public payable {
      uint needed = price * _quantity;
      require(msg.value >= needed, 'not enough eth');
      require(token.allowance(owner, address(this)) >= _quantity, 'not enough allowance');
      uint refund = msg.value - needed;
      bool sent = payable(msg.sender).send(refund);
      require(sent, 'failed to refund');
      bool success = token.transferFrom(owner, msg.sender, _quantity);
      require(success, 'failed to transfer token to buyer');
      bool done = payable(owner).send(needed);
      require(done, 'failed to pay owner');
   }
}
