// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
contract IfElse {
    function check(int256 number) public pure returns(string memory ){
        if (number > 0) {
            return 'positive number';
        } else if (number == 0) {
            return 'zero';
        } else {
            return 'negative number';
        }
    }
}