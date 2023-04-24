pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED

import "./ContractB.sol";

contract ContractA {

    ContractB _contracB;

    constructor(address next) {
        _contracB = ContractB(next);
    }

    function deposit() public payable {
        _contracB.deposit{value: 2 ether}();
    }
}