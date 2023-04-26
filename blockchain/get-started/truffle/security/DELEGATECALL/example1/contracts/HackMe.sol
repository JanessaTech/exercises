pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED
import "./Lib.sol";

contract HackMe {
    address public owner;
    Lib public lib;

    constructor(address _lib) {
        owner = msg.sender;
        lib = Lib(_lib);
    }
    event log(string name, address from, bool success, bytes data);

    fallback() external payable {
        (bool success, bytes memory data) = address(lib).delegatecall(msg.data);
        emit log("fallback", msg.sender, success, data);
    }
}