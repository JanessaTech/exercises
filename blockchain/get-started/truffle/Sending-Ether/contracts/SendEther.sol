pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED

contract SendEther {
    function sendViaTransfer(address payable to) public payable {
        to.transfer(msg.value);
    }
    function sendViaSend(address payable to) public payable {
        bool sent = to.send(msg.value);
        require(sent, "Failed to send Ether");
    }
    function senViaCall(address payable to) public payable {
        (bool sent, ) = to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
}