pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED
contract Wallet {
    address owner;
    
    constructor() payable{
        owner = msg.sender;
    }

    function transfer(address payable to, uint amount) public {
        require(tx.origin == owner, "Not owner");
        (bool sent,) = to.call{value:amount}("");
        require(sent, "Failed to send Ether");
    }
}