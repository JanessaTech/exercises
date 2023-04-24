pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED


contract ContractC {
    event track(string flag, address from);

    constructor() {
    }
    
    function callNext() public {
        emit track("ConractC", msg.sender);
    }
}