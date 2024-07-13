// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

library CustomArray {
    function sum(uint256[] storage self) public view returns(uint256) {
        uint256 res = 0;
        for (uint i = 0; i < self.length; i++) {
            res += self[i];
        }
        return res;
    }  
}

contract UsingLib {
    uint256[] arr;
    using CustomArray for uint256[];

    constructor() {
        arr = [1, 2, 3];
    }

    function getSum() public view returns(uint256) {
        uint256 res = arr.sum();
        return res;
    }
}