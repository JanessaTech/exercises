// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

contract HotelRoom {
    event logger(address indexed sender, uint256 refund);
    address payable owner;
    enum Status{
        vacant,
        ocuppied
    }

    Status status;
    uint256 price;
    
    constructor(uint256 _price) {
        owner = payable(msg.sender);
        price = _price;
    }

    modifier onlyVacant() {
        require(status == Status.vacant, 'Only vacant');
        _;
    }

    function book() public payable onlyVacant {
        require(msg.value >= price, 'not enough');
        uint256 refund = msg.value - price;
        payable(msg.sender).transfer(refund);
        owner.transfer(price);
        status = Status.ocuppied;
        emit logger(msg.sender, refund);
    }

}