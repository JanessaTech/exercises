// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract From1 {
    function foo() public pure virtual returns(string memory) {
        return "From1";
    }
}