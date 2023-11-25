// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Mywallet {
    address payable public owner;
    constructor() payable {
        owner = payable(msg.sender);
    }
    modifier isOwner() {
        require(msg.sender == owner, "You are not owner");
        _;
    }

    function deposit() public payable {} // The ether you call with will be deposited into this contract
    function nonPayable() public {} // An error will be thrown if you call this function along with ether

    function withDraw() public isOwner {
        uint amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "withdraw is failed");
    }
    function transfer(address payable _to, uint amount) public payable isOwner {
        (bool success, ) = _to.call{value: amount}("");
         require(success, "transfer is failed");
    }
}