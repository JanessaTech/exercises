// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Redo {
    bool private locking;
    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed from, uint256 amount);
    modifier non_reEntrant() {
        require(!locking, 'reentrant');
        locking = true;
        _;
        locking = false;
    }
    mapping(address => uint256) balances;
    function deposit() public payable{
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    function withdraw() public payable{
        uint256 amount = balances[msg.sender];
        require(amount > 0, 'no eth left');
        balances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{
            value: amount,
            gas: 2300
        }("");
        require(success, 'failed to withdraw');
        emit Withdraw(msg.sender, amount);
    }
}
