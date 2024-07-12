// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Counter {
    uint256 public cnt;
    function get()public view returns(uint256) {
        return cnt;
    }
    function inc() public {
        cnt += 1;
    }
    function dec() public {
        cnt -= 1;
    }
}