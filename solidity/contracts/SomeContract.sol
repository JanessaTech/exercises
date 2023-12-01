// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./SomeLibrary.sol";

contract SomeContract {
    
    using SomeLibrary for uint;
    
    function add3(uint number) public pure returns (uint) {
        return number.add(3);    
    }
}