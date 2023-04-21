pragma solidity ^0.5.16;

contract Owned {
    address payable owner;
    constructor() public {
        owner = msg.sender;
    }
    modifier onlyOwner {
        require(msg.sender == owner,  "Only the contract owner can call this function");
        _;
    }
}