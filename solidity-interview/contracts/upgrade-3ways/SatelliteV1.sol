// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./IbusinessLogic.sol";


contract SatelliteV1 is IbusinessLogic{
    function getAge() override external pure returns(uint) {
        return 25;
    }
}