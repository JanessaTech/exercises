pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED
contract HasFallbackOnlyTest {
    event log(string msg, address from);
    function hasPayable() public payable{}
    function nonPayable() public {}
    fallback () external payable {
        emit log("fallback", msg.sender);
    }
}