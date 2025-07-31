// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract FailTransferContract  {
    mapping(address => uint) public balances;
    
    function transfer(address to, uint amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}