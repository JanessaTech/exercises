// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract PaymentContract {
    mapping(address => uint) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function transfer(address to, uint amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
    
    function withdraw() public {
        uint balance = balances[msg.sender];
        require(balance > 0, "No balance to withdraw");
        // intentionally make a failure
        require(balance != 100 gwei, "Special failure condition");
        
        balances[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
    }
}