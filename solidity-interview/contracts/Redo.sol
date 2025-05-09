// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Redo{
    mapping(address => uint256) balances;
    bool private locking;

    event Deposit(address indexed from, uint256 amount);
    event Withdraw(address indexed from, uint256 amount);

    modifier noReentrant() {
        require(!locking, 'reentrance');
        locking = true;
        _;
        locking = false;
    }
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    function withdraw() external noReentrant {
        uint256 amount = balances[msg.sender];
        require(amount > 0, 'no eough eth');

        balances[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{
            value: amount,
            gas: 2300
        }("");
        require(success, 'failed to withdraw');
        emit Withdraw(msg.sender, amount);
    }

}