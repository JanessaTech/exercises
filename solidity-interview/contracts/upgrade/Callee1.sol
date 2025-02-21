// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract Callee1 {
    uint256 public num;
    address public sender;
    uint256 public value;
    
    constructor() {
        owner = payable(msg.sender);
    }

    address payable owner;

    function setVars(uint256 _num) public payable {
        num = _num;
        sender = msg.sender;
        value = msg.value;
    }

}