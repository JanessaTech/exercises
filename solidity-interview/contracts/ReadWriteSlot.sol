// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

library StorageLib {
    struct AddressSlot {
        string value;
    }

    function getAddressSlot(bytes32 slot)
        internal
        pure
        returns(AddressSlot storage pointer) {
            assembly {
                pointer.slot := slot
            }
        }
}

contract ReadWriteSlot {

    bytes32 constant test_slot = keccak256('hahaha');
    function write(string memory _name) external {
        StorageLib.AddressSlot storage data = StorageLib.getAddressSlot(test_slot);
        data.value = _name;
    }
    function read() external view returns(string memory) {
        StorageLib.AddressSlot storage data = StorageLib.getAddressSlot(test_slot);
        return data.value;
    }
}