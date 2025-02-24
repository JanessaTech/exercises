// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

library StorageLib {
    struct StorageSlot {
        string value;
    }

    function get(bytes32 slot) internal pure returns(StorageSlot storage pointer) {
        assembly {
            pointer.slot := slot
        }
    }
}
contract ReadWriteSlot {
    bytes32 private constant test_slot  = keccak256("aaaaa");
    function write(string memory name) public {
        StorageLib.StorageSlot storage data = StorageLib.get(test_slot);
        data.value = name;
        
    }
    function read() public view returns(string memory) {
        StorageLib.StorageSlot storage data = StorageLib.get(test_slot);
        return data.value;
    }
}