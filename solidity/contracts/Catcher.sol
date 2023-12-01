// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Catcher {
    address public owner;
    constructor(address _owner) {
        require(_owner != address(0), "address is invalid which is 0");
        if (_owner == 0x0000000000000000000000000000000000000001) {
            revert("revert: address is 0x0000000000000000000000000000000000000001");
        }
        assert(_owner != 0x0000000000000000000000000000000000000002);
        owner = _owner;
    }

    function myFun(uint _num) public pure returns(string memory) {
        require(_num != 0, "The input for myFun is 0");
        if (_num == 1) {
            revert("The input for myFun is 1");
        }
        assert(_num != 2);
        return "The input for myFun is greater  than 1, that's fine";
    }
}