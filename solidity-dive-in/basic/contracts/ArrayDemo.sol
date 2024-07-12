// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract ArrayDemo {
    uint[] public arr1;
    function push(uint num) public {
        arr1.push(num);
    }
    function len() public view returns(uint) {
        return arr1.length;
    }
    function remove(uint index) public {
        delete arr1[index];
    }

    function createNew() public pure returns(uint[] memory) {
        uint[] memory aa = new uint[](3);
        aa[0] = 0;
        aa[1] = 0;
        aa[2] = 0;
        return aa;
    }
}