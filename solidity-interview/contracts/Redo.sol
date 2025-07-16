// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Redo {
   function arraySum(uint256[] memory arr) public pure returns(uint256) {
      uint256 sum;
      assembly {
         let len := mload(arr)
         let ptr := add(arr, 0x20)
         for { let i := 0} lt(i, len) { i := add(i, 1)} {
            sum := add(sum, mload(ptr))
            ptr := add(ptr, 0x20)
         }
      }
      return sum;
   }
}