// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Array {
    uint[] arr;

    function get(uint i) public view returns(uint) {
        return arr[i];
    }
    function push(uint i) public {
        return arr.push(i);
    }
    function pop() public {
        arr.pop();
    }

    function getArr() public view returns(uint[] memory) {
        return arr;
    }

    function reset() public {
        delete arr;
    }
}