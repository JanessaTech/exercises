// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract HotelRoom {
    enum Status {Vacant, Occupied}
    Status status;
    address payable owner;
    uint256 price;

    event Occupy(address indexed from, uint256 amount);
    event Release();

    constructor(uint256 _price) {
        owner = payable(msg.sender);
        status = Status.Vacant;
        price = _price;
    }

    modifier onlyVacant() {
        require(status == Status.Vacant, 'Not vacant');
        _;
    }
    modifier cost(uint256 amount) {
        require(msg.value >= amount, 'Not enough eth');
        _;
    }

    function release() public {
        require(msg.sender == owner, 'only owner');
        require(status == Status.Occupied, 'Not Occupied');
        status = Status.Vacant;

        emit Release();
    }

    receive() external payable onlyVacant cost(price){
        status = Status.Occupied;
        uint refund = msg.value - price;
        bool sent = owner.send(price);
        require(sent, 'Failed to send eth to owner');
        sent = payable(msg.sender).send(refund);
        require(sent, 'failed to refund to msg.sender');

        emit Occupy(msg.sender, price);
    }
}