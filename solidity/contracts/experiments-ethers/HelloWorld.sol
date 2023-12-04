// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloWorld {
    string public name = "default";

    constructor() payable {}

    function setName(string memory _name) public {
        name = _name;
    }
    function getName() public view returns(string memory) {
        return name;
    }
}