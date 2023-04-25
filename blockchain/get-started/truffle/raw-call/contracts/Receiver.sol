pragma solidity ^0.8.19;

// SPDX-License-Identifier: UNLICENSED
contract Receiver {
    string _name;
    event log(string name, address from);
    constructor() payable {}
    function setName(string memory name) public payable {
        _name = name;
        emit log(name, msg.sender);
    }

    function getName() public view returns(string memory){
        return _name;
    }

    fallback () external payable {// it is called when send ether without data provided in transaction
        emit log("fallback", msg.sender);
    }
}
