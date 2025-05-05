// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Redo {
    function  sumArray(uint256[] memory arr) public pure returns (uint256) {
        uint256 sum;
        assembly {
            let length := mload(arr)
            let ptr := add(arr, 0x20)
            for { let i := 0 } lt(i, length) { i := add(i, 1) } {
                sum := add(sum, mload(ptr))
                ptr := add(ptr, 0x20)
            }
        }
        return sum;
    }
}

