// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Person {
    string public name;
    constructor(string memory _name) {
        name = _name;
    }
}