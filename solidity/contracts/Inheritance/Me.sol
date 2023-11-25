// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./Person.sol";

contract Me is Person {
    constructor(string memory _name) Person(_name) {
    }
}