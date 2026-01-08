// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Redo {
    bool private locked;

    mapping(address => uint256) balances;

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed from, uint256 amount);

    modifier non_reentrant() {
        require(!locked, 'reentrant');
        locked = true;
        _;
        locked = false;
    }

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw() public non_reentrant {
        uint256 amount = balances[msg.sender];
        require(amount > 0, 'no eth');
        balances[msg.sender] = 0;
        (bool success,) = payable(msg.sender).call{gas: 2300, value: amount}('');
        require(success, 'failed to withdraw');
        emit Withdraw(msg.sender, amount);
    }
}