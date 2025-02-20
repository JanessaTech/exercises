// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "contracts/Library/CustomArray.sol";

contract TestArrayLib {
    using CustomArray for uint256[];
    uint256[] arr;
    function test() public {
        for (uint i = 0; i < 3;i++) {
            arr.push(i);
        }
        arr.remove(1);
        assert(arr.length == 2);
        assert(arr[0] == 0);
        assert(arr[1] == 2);
    }
}