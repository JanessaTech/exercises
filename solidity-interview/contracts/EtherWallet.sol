// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract EtherWallet {
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier isOwner() {
        require(msg.sender == owner, 'caller is not owner');
        _;
    }

    function withdraw(uint256 _amount) public isOwner {
        uint256 balance = address(this).balance;
        require(balance >= _amount, 'The amount is too large');
        bool _send = payable(msg.sender).send(_amount);
        require(_send, 'Failed to withdraw');
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function send() public payable {
        bool _send = payable(address(this)).send(msg.value);
        require(_send, 'Failed to send eth to wallet');
    }

    receive() external payable {}
}