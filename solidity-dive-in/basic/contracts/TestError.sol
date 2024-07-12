// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract TestError {
    function testRequire(uint num) public pure{
        require(num > 0, 'num should greater than 0');
    }

    function testRevert(uint num) public pure{
        if (num <= 0) {
            revert('num should be greater than 0');
        }
    }

    function testAssert(uint num) public pure {
        assert(num > 0);
    }


}