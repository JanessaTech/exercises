pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED

import "./EtherStore.sol";

contract Bank {
    EtherStore  _etherStore;
    constructor() payable {
        _etherStore = (new EtherStore){value: 1 ether}();
    }
}

