// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


contract ArraySum {
    function sumArray(uint256[] memory arr) public pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }
    function sumArrayOptimized(uint256[] memory arr) public pure returns (uint256) {
        uint256 sum;
        assembly {
            let length := mload(arr)          // 读取数组长度（位于内存 arr 的 0x20 位置）
            let ptr := add(arr, 0x20)        // 数组数据起始指针（跳过长度字段）
            
            for { let i := 0 } lt(i, length) { i := add(i, 1) } {
                sum := add(sum, mload(ptr))  // 读取当前元素并累加
                ptr := add(ptr, 0x20)        // 指针移动到下一个元素（32 字节）
            }
        }
        return sum;
    }
}