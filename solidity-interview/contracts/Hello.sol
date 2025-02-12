// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Hello {
    string public _message = '';

    constructor(string memory message) {
        _message = message;
    }

    function say() public view returns (string memory) {
        return _message;
    }
}