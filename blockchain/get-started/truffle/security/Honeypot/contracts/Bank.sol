pragma solidity ^0.8.19;

import "./Logger.sol";
// SPDX-License-Identifier: UNLICENSED
contract Bank {
    mapping(address => uint) public balances;
    Logger logger;
    constructor(address _logger) {
        logger = Logger(_logger);
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        logger.log(msg.sender, msg.value, "Deposit");
    }

    function withdraw(uint _amount) public {
        require(_amount <= balances[msg.sender], "Insufficient funds");
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");

        balances[msg.sender] = _amount;

        logger.log(msg.sender, _amount, "Withdraw");
    }

}