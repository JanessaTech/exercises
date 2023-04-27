pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED
contract EtherStore {
    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint val = balances[msg.sender];
        require(val > 0);
        (bool success,) = msg.sender.call{value:val}("");
        require(success, "failed to send ether");
        balances[msg.sender] = 0;
    }
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}