pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED

import "./ContractC.sol";

contract ContractB {
    ContractC _contractC;

    event track(string flag, address from);
    
    constructor(address next) {
        _contractC = ContractC(next);
    }

    function callNext() public {
        _contractC.callNext();
        emit track("ContractB", msg.sender);
    }
}