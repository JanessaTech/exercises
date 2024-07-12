// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Paybale {
    address payable owner;
    constructor() {
        owner = payable(msg.sender);
    }
    modifier isOwner() {
        require(owner == msg.sender, 'You are not owner');
        _;
    }

    function deposit() public payable {}
    function nondeposit() public {}
    function withdraw() public isOwner {
        uint amount = address(this).balance;
        (bool sucess,) = owner.call{value: amount}("");
        require(sucess, "Failed to withdraw");
    }
    function transfer(address payable to, uint _amount) public isOwner{
        uint amount = address(this).balance;
        require(amount >= _amount, 'Not enough deposit');
        (bool success,) = to.call{value: _amount}("");
        require(success, 'Failed to transfer');
    }
}