pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED


contract Bank {
    address receiver;

    function setReceiver(address rev) public {
        receiver = rev;
    }

    event track(string name, address to, uint amount);

    function transfer(uint amount) public {
        require(address(this).balance > amount);
        payable(receiver).transfer(amount);
        emit track("transfer", receiver, amount);
    }

    receive () external payable {
        emit track("receive", msg.sender, msg.value);
    }

}