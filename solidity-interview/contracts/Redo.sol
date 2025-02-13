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
        require(msg.sender == owner, 'Not owner');
        _;
    }
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function withdraw(uint256 _amount) public isOwner {
        uint256 balance = address(this).balance;
        require(balance >= _amount, 'The _amount is too large');
        bool sent = payable(address(msg.sender)).send(_amount);
        require(sent, 'Failed to withdraw');
    }

    function send() public payable{
        bool sent = payable(address(this)).send(msg.value);
        require(sent, 'Failed to send eth');
    }
    
    receive() external payable{}
}