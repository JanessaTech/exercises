pragma solidity ^0.8.19;

import "./Owned.sol";

// SPDX-License-Identifier: UNLICENSED
contract Faucet is Owned {
    string _name = "defalt_name";
    constructor() payable {}

    function setName(string memory name) public {
        _name = name;

    }

    function getName() public view returns(string memory) {
        return _name;
    }
}