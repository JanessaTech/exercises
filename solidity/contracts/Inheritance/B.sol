// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./A.sol";

contract B is A {
    function foo() public pure virtual override returns(string memory) {
        return "B";
    }
}