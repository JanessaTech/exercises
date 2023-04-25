pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED
library ArrayLib {
    event callEvent(address sender, address origin, address from);
    //remove item from arr by index
    function remove(uint[] storage arr, uint index) public {
        require(arr.length > 0, "Can't remove from empty array");
        arr[index] = arr[arr.length - 1];
        arr.pop();
        emit callEvent(msg.sender, tx.origin, address(this));
    }
}