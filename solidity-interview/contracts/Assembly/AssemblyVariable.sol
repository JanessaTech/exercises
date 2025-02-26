// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";


contract AssemblyVariable {
    function setting() public pure returns(uint256 x, bool y){
        assembly {
            x := 100
            y := false
        }
    }
}
