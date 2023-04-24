pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED
contract Owned {
    address owner;
    
    constructor() {
        owner = msg.sender;
    }
  
    // Access control modifier
    modifier onlyOwner {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }
}