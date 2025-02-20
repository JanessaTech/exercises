// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract TimeLock {
    mapping(address => uint256) public balances;
    mapping(address => uint256) public timeLock;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        timeLock[msg.sender] = block.timestamp + 7 days;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, 'insufficent balance');
        require(block.timestamp > timeLock[msg.sender], 'not allow');

        uint amount = balances[msg.sender];
        bool sent = payable(msg.sender).send(amount);
        require(sent, 'failed to withdraw');
        balances[msg.sender]  = 0;
    }

    function getBalance() public view returns(uint256) {
        return balances[msg.sender];
    }
}