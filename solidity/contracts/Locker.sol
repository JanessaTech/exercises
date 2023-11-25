// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Locker {
    bool public locked;
    uint public number;
    modifier noReentrancy() {
        require(!locked, "You are not allowed to do operation. It is locked");
        locked = true;
        _;
        locked = false;
    }
    function lock() public {
        locked = true;
    }
    function setNumber(uint _num) public noReentrancy {
        number = _num;
    }
}