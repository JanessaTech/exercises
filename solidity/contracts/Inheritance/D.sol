// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./B.sol";
import "./C.sol";

contract D is C, B {
    function foo() public pure override(B, C) returns(string memory) {
        return super.foo();
    }
}