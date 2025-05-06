// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import 'contracts/inheritance/From1.sol';
import 'contracts/inheritance/From2.sol';


contract Concrete is From2, From1 { 
    function foo() public pure override(From2, From1) returns (string memory) {
        return super.foo(); 
    }
}