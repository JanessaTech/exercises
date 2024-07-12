// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract SimpleStorage {
    uint256 private _num;
    function set(uint256 num) public {
        _num = num;
    }
    function get() public view returns(uint256) {
        return _num;
    }
}