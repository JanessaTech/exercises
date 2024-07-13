// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract ReceiveEther {
    fallback() external payable {}
    receive() external payable {}

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
}

contract SendEther {
    function viaTransfer(address payable to) public payable {
        to.transfer(msg.value);
    }
    function viaSend(address payable to) public payable{
        bool sent = to.send(msg.value);
        require(sent, 'Failed to send ether');
    }
}