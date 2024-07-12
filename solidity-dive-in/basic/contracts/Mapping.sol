// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Mapping {
    mapping(address => string) names;

    function set(address addr, string memory name) public {
        names[addr] = name;
    }
    function get(address add) public view returns(string memory) {
        return names[add];
    }
    function remove(address addr) public {
        delete names[addr];
    }
}