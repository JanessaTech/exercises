// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Caller {
  function makeCalls(address _contractAddress) public {
    address(_contractAddress).call(abi.encodeWithSignature("callMe()"));
    address(_contractAddress).delegatecall(abi.encodeWithSignature("callMe()"));
  }
}