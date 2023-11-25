// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Event {
    string public name;
    uint public age;
    event trace(string indexed name, uint age);
    function setNameAndAge(string calldata _name, uint _age) public {
        name = _name;
        age = _age;
        emit trace(_name, _age);
    }
}