// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
import "hardhat/console.sol";
interface IbusinessLogic {
    function getAge() external pure returns(uint);
}