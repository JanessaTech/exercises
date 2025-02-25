// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import './IbusinessLogic.sol';

contract MainContract {
    address public admin;
    IbusinessLogic public businessLogic;

    constructor() {
        admin = msg.sender;
    }

    function upgrade(address _businessLogic) external {
        require(msg.sender == admin, 'not admin');
        businessLogic = IbusinessLogic(_businessLogic);
    }

    function getAge() external view returns(uint) {
        return businessLogic.getAge();
    }

}