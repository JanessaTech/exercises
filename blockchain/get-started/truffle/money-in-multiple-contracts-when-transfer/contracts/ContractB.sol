pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED
import "./ContractC.sol";

contract ContractB {
    ContractC _contractC;

    constructor(address next) {
        _contractC = ContractC(next);
    }

    function deposit() public payable {
        _contractC.deposit{value: 1 ether}();
    }
}