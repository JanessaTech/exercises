// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Redo {
   bool private locking;
   mapping(address => uint256) balances;
   event Deposit(address indexed from , uint256 amount);
   event Withdraw(address indexed from , uint256 amount);
   modifier non_entrant() {
      require(!locking, 're_entrant');
      locking = true;
      _;
      locking = false;
   }

   function deposit() public payable {
      balances[msg.sender] += msg.value;
      emit Deposit(msg.sender, msg.value);
   }
   function withdraw() public non_entrant{
      uint256 amount = balances[msg.sender];
      require(amount > 0, 'no eth');
      balances[msg.sender] = 0;
      (bool success, ) = payable(msg.sender).call{value: amount, gas: 2300}('');
      require(success, 'failed to withraw');
      emit Withdraw(msg.sender, amount);
   }
}