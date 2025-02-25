// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
import "hardhat/console.sol";

// for storing data
contract PersonStorage {
    mapping(address => bool) acls;

    uint age;
    string name;

    constructor() {
        acls[msg.sender] = true;
    }

    modifier isAllowed () {
        require(acls[msg.sender] == true , 'not allowed');
        _;
    }

    function addACL(address _addr) public isAllowed {
        acls[_addr] = true;
    }
    function removeACL(address _addr) public isAllowed {
        acls[_addr] = false;
    }


    function getName() external view returns(string memory) {
        return  name;
    }
    function setName(string memory _name) external isAllowed {
        name = _name;
    }
    function getAge() external view returns(uint) {
        return age;
    }
    function setAge(uint _age) external isAllowed {
        age = _age;
    }

}