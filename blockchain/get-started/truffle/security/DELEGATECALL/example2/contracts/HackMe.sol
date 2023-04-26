pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED
import "./Lib.sol";

contract HackMe {
    address public lib;
    address public owner;
    uint public someNumber;
    event track(string name, address lib);

    constructor(address _lib) {
        lib = _lib;
        owner = msg.sender;
    }

    function doSomething(uint _num) public {
        emit track("before delegatecall", lib);
        lib.delegatecall(abi.encodeWithSignature("doSomething(uint256)", _num));
        emit track("after delegatecall", lib);
    }
}