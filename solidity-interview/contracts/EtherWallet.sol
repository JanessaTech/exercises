// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract EtherWallet {
    address payable public owner;
    constructor() {
        owner = payable(msg.sender);
    }
    modifier isOwner() {
        require(msg.sender == owner, 'Not owner');
        _;
    }

    function withdraw(uint256 amount) public isOwner {
        uint256 balance = address(this).balance;
        require(balance >= amount, 'The amount is too large');
        bool sent = payable(address(msg.sender)).send(amount);
        require(sent, 'Failed to withdraw');
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function getOwner() public view returns(address) {
        return owner;
    }

    receive() external payable {}
}