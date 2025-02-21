// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SimpleDelegator {
    uint256 public num;
    address public sender;
    uint256 public value;
    function setVars(address target, uint256 _num) public payable {
        (bool success, ) = target.delegatecall(abi.encodeWithSignature("setVars(uint256)", _num));
        require(success, 'failed to call delegatecall');
    }
}