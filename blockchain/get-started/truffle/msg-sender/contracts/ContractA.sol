pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED

import "./ContractB.sol";

contract ContractA {

    ContractB _contracB;

    event track(string flag, address from);

    constructor(address next) {
        _contracB = ContractB(next);
    }

    function callNext() public {
        _contracB.callNext();
        emit track("ConractA", msg.sender);
    }
}