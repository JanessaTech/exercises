// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract ArrayDemo {
    uint[] arr;

    function push(uint num) public {
        arr.push(num);
    }

    function len() public view returns(uint) {
        return arr.length;
    }

    function gen() public pure returns(uint[] memory) {
        uint[] memory aa = new uint[](1);
        aa[0] = 1;
        return aa;
    }
}