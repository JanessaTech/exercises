// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Redo {
    address payable owner;
    constructor() {
        owner = payable(msg.sender);
    }
    modifier isOwner() {
        require(owner == msg.sender, 'Not owner');
        _;
    }
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
    function withdraw(uint256 amount) public isOwner {
        uint256 balance = address(this).balance;
        require(balance >= amount, 'The amount is too large');
        bool _send = payable(msg.sender).send(amount);
        require(_send, 'Failed to withdraw');
    }
    function send() public payable{
        bool _send = payable(address(this)).send(msg.value);
        require(_send, 'Failed to send eth to wallet');
    }
}