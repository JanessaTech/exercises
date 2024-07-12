// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract A {
    string name = 'Contract A';

    function getName() public view returns(string memory) {
        return name;
    }
}

contract B is A {
    //string name = 'Contract B';
    constructor() {
        name = 'Contract B';
    }
}