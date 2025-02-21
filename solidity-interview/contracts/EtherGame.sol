// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract EtherGame {
    uint256 target= 1000;
    address winner;
    uint256 balance;

    event FoundWinner(address indexed winner);
    event Withdraw(address indexed from, uint256 amount);

    modifier isWinner() {
        require(winner == msg.sender, 'Not winner');
        _;
    }
    
    function deposit() public payable{
       balance += msg.value;
       require(balance <= target, 'game is over');
       if (balance == target) {
        winner = msg.sender;
        emit FoundWinner(winner);
       }
    }

    function withdraw() public isWinner {
        uint256 amount = address(this).balance;
        bool sent = payable(msg.sender).send(amount);
        require(sent, 'failed to wihdraw');
        emit Withdraw(msg.sender, amount);
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}