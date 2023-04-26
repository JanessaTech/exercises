pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED

contract Receiver {
    string name;
    constructor(string memory _name) payable {
        name = _name;
    }
    mapping(address => uint) public addressToAmount;

    event track(string name, address from, uint amount);
    fallback () external payable {
        addressToAmount[msg.sender] += msg.value;
        emit track("fallback", msg.sender, msg.value);
    }
    receive() external payable {
        addressToAmount[msg.sender] += msg.value;
        emit track("receive", msg.sender, msg.value);
    }
}
