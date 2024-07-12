// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Loop {
    function sum(uint num) public pure returns(uint) {
        uint res = 0;
        for (uint i = 0; i < num; i++) {
            res += i;
        }
        return res;
    }
}