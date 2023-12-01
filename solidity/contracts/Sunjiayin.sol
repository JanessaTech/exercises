// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Sunjiayin {
    function getBlance() public view returns(uint) {
        return address(this).balance;
    }
}