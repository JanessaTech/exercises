// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Redo {
    function sumArray(uint[] memory arr) public pure returns(uint) {
        uint sum;
        assembly {
            let len := mload(arr)
            let ptr := add(arr, 0x20)
            for {let i := 0} lt(i, len) { i := add(i, 1)} {
                sum := add(sum, mload(ptr))
                ptr := add(ptr, 0x20)
            }
        }
        return sum;
    }
}