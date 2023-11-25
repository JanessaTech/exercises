// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract A {
    function foo() public pure virtual returns(string memory) {
        return "A";
    }
}