// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SharedWallet {
    address private curOwner;
    mapping(address => bool) private owners;

    event  AddOwner(address indexed from, address indexed newOwner);
    event WithDraw(address indexed from, uint256 amount);
    event Deposit(address indexed from, uint256 amount);

    constructor(){
        curOwner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == curOwner || owners[msg.sender], 'Not owner');
        _;
    }

    function addOwner(address newOwner) public isOwner {
        require(newOwner != address(0), 'Invalid address');
        owners[newOwner] = true;
    }

    function removeOwner(address owner) public {
        owners[owner] = false;
    }

    function withdraw(uint256 amount) 
    public
    isOwner {
        require(address(this).balance >= amount, 'Not enough eth');
        bool sent = payable(msg.sender).send(amount);
        require(sent, 'failed to withdraw');

        emit WithDraw(msg.sender, amount);
    }

    function deposit() public payable{
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function isValidOwner(address addr) public view returns(bool) {
        if (addr == curOwner || owners[addr] == true) {
            return true;
        }
        return false;
    }
}