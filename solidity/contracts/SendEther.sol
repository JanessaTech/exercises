// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SendEther {
    function viaTransfer(address payable _to) public payable {
        _to.transfer(msg.value);
    }
    function viaSend(address payable _to) public payable {
        bool sent = _to.send(msg.value);
        require(sent, "viaSend is failed");
    }
    function viaCall(address payable _to) public payable {
        (bool success, ) = _to.call{value: msg.value}('');
        require(success, "viaCall is failed");
    }
}