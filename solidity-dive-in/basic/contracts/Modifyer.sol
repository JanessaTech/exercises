// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Modifyer {
    modifier check(uint a) {
        require(a > 4, 'input should greater than 4');
        _;
    }

    function compute(uint a) public pure check(a) returns(uint) {
        return a * a;
    }
}