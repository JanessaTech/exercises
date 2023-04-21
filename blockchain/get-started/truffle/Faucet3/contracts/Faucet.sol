pragma solidity ^0.5.16;

import "./Mortal.sol";

// SPDX-License-Identifier: MIT
contract Faucet is Mortal {
    string _name;
    event Withdrawal(address indexed to, uint amount);
    event Deposit(address indexed from, uint amount);
    // Give out ether to anyone who asks
    function withdraw(uint withdraw_amount) public {
        // Limit withdrawal amount
        require(address(this).balance >= withdraw_amount, "Insufficient balance in faucet for withdrawal request");
        require(withdraw_amount <= 0.1 ether, "withdraw_amount cannot be larger than 0.1 ether");
        // Send the amount to the address that requested it
        msg.sender.transfer(withdraw_amount);
        emit Withdrawal(msg.sender, withdraw_amount);
    }

    function setName(string memory name) public {
        _name = name;
    }

    function getName() public view returns(string memory) {
        return _name;
    }
 
    // Accept any incoming amount
    function() external payable {
        emit Deposit(msg.sender, msg.value);
    }
}