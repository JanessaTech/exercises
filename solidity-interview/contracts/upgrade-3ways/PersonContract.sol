// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./PersonStorage.sol";

// for saving data into PersonStorage
// You should upgrade this contract when the code logic is changed
contract PersonContract {
    PersonStorage personStorage;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(owner == msg.sender, 'not owner');
        _;
    }

    function setPersonStorage(address _personStorage) external {
        personStorage = PersonStorage(_personStorage);
    }

    function getAge() external view returns(uint) {
        return personStorage.getAge();
    }

    function setAge(uint _age) external {
        personStorage.setAge(_age);
    }

    function getName() external view returns(string memory) {
        return personStorage.getName();
    }
    function setName(string memory _name) external {
        personStorage.setName(_name);
    }
}