// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CalleeA {
    function say() public pure returns(string memory) {
        return "Hello Janessa";
    }
}