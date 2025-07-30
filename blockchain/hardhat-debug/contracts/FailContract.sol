// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract FailContract  {
    function willFail() public pure {
        require(false, 'this function will always fail');
    }
}