// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Redo {
   bool private locked;
   mapping(address => uint256) balances;

   modifier non_reentrant() {
      require(!locked, 'reentrant');
      locked = true;
      _;
      locked = false;
   }
   event Deposit(address indexed from, uint256 amount);
   event Withdraw(address indexed from, uint256 amount);

   function deposit() public payable {
      balances[msg.sender] += msg.value;
      emit Deposit(msg.sender, msg.value);
   }
   function withdraw() public payable non_reentrant {
      uint256 amount = balances[msg.sender];
      require(amount > 0, 'no eth');
      balances[msg.sender] = 0;
      (bool success, ) = payable(msg.sender).call{gas: 2300, value: amount}('');
      require(success, 'failed to withdraw');
      emit Withdraw(msg.sender, amount);
   }
}