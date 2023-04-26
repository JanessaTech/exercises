pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED

contract Lib {
    address public owner;
    event track(string name, address from, bytes data);

    function pwn() public {
        owner = msg.sender;
        emit track("Lib.pwn", msg.sender, msg.data);
    }   
}