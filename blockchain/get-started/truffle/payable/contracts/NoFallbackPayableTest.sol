pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED

contract NoFallbackPayableTest {
    function hasPayable() public payable{}
    function nonPayable() public {}
}