pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED

contract Lib {
    uint public someNumber;

    function doSomething(uint _num) public {
        someNumber = _num;
    }
}