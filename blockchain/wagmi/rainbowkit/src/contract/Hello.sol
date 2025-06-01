// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Hello {
    string private _message = '';

    event SendMessage(address indexed from, string msg);

    constructor(string memory message) {
        _message = message;
    }

    function setMessage(string memory newMsg) public {
        _message = newMsg;
        emit SendMessage(msg.sender, newMsg);
    }

    function getMessage() public view returns(string memory) {
        return _message;
    }
}