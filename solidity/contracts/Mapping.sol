// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Mapping {
    mapping(uint => string) names;

    function get(uint key) public view returns(string memory) {
        return names[key];
    }
    function set(uint key, string memory name) public {
        names[key] = name;
    }
    function remove(uint key) public {
        delete names[key];
    }
}