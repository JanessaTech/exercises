// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract AddressBook {
    mapping (address=> address[]) addressList;
    mapping (address=>mapping (address=>string)) aliases;

    function add(address addr, string memory _alias) public {
        addressList[msg.sender].push(addr);
        aliases[msg.sender][addr] = _alias;
    }

    function getAlias(address addr) public view returns(string memory){
        return aliases[msg.sender][addr];
    }

    function remove(address addr) public {
        address[] storage subList = addressList[msg.sender];
        for (uint256 i = 0; i < subList.length; i++) {
            if (subList[i] == addr) {
                if (subList.length > 1 && i < subList.length - 1) {
                    subList[i] = subList[subList.length - 1];
                }
                delete subList[subList.length - 1];
                subList.pop();
                delete aliases[msg.sender][addr];
            }
        }
    }
}