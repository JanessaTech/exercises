// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract A {
    string name;
    constructor(string memory _name) {
        name = _name;
    }
}

contract B {
    uint age;
    constructor(uint _age) {
        age = _age;
    }
}

contract Stu is A, B {
    constructor(string memory _name, uint _age) A(_name) B(_age) {}

    function info() public view returns(string memory, uint) {
        return (name, age);
    }
}