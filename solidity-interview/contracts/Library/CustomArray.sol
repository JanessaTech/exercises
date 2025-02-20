// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library CustomArray {
    function remove(uint256[] storage arr, uint256 index) internal {
        if (arr.length > 0 && arr.length > index) {
            arr[index] = arr[arr.length - 1];
            arr.pop();
        }
    }
}