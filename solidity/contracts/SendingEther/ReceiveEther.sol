// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract ReceiveEther {
    event log(address indexed from, string action);
    receive() external payable {
        emit log(address(this), "receive");
    }
    fallback() external payable {
        emit log(address(this), "fallback");
    }
    function getBlance() public view returns(uint) {
        return address(this).balance;
    }
    function withdraw(uint _amount) public {
         emit log(address(this), "withdraw");
    }
}