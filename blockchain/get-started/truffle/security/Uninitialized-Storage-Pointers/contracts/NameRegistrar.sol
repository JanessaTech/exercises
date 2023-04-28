pragma solidity ^0.8.19;
// SPDX-License-Identifier: UNLICENSED

contract NameRegistrar {
    bool public unlocked = false;

    struct NameRecord { // map hashes to addresses
        bytes32 name;
        address mappedAddress;
    }
    mapping(address => NameRecord) public registeredNameRecord;
    mapping(bytes32 => address) public resolve;

    function register(bytes32 _name) public {
        NameRecord memory newRecord;  // NameRecord cannot be storage, otherwise there is a compiling error
        newRecord.name = _name;
        newRecord.mappedAddress = msg.sender;
        resolve[_name] = msg.sender;
        registeredNameRecord[msg.sender] = newRecord;

        require(unlocked, "should unlock first");
    }

    function checkNameRecord() public view returns(bytes32, address) {
        return (registeredNameRecord[msg.sender].name, registeredNameRecord[msg.sender].mappedAddress);
    }

}