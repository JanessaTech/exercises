// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract DataType {
    function getMax() public pure returns(int256) {
        return type(int256).max;
    }

    function getMin() public pure returns(int256) {
        return type(int256).min;
    }
}