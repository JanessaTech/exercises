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
  function sumArray(uint[] memory arr) public pure returns(uint) {
    uint sum;
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