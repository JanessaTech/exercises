// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./CalleeA.sol";

contract CallerA {
    function callByObject(CalleeA _caller) public pure returns(string memory) {
        return _caller.say();
    }
    function callByAddress(address _caller) public pure returns(string memory) {
        CalleeA caller = CalleeA(_caller);
        return caller.say();
    }

}