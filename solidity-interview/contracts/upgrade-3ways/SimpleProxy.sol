// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract SimpleProxy {
    // Important: pls make sure the order of variables defined below should be as exactly same as Callee1.sol and Callee2.sol
    uint256 public num;
    address public sender;
    uint256 public value;

    address payable _owner; // no use, for reserve slot purpose
    bytes32 private constant owner_slot = keccak256('owner_slot');
    bytes32 private constant implementation_slot = keccak256('implementation_slot');

    constructor() {
        bytes32 slot = owner_slot;
        address _admin = msg.sender;
        assembly {
            //allows you to store a value in storage
            sstore(slot, _admin)
        }
    }

    function admin() public view returns(address owner) {
        bytes32 slot = owner_slot;
        assembly {
            owner := sload(slot)
        }
    }

    function implementation() public view returns(address _implementation) {
        bytes32 slot = implementation_slot;
        assembly {
            _implementation := sload(slot)
        }
    }

    function upgrade(address _contract) external {
        require(msg.sender == admin(), 'Not owner');
        bytes32 slot = implementation_slot;
        assembly {
            sstore(slot, _contract)
        }
    }

    function _delegate(address _implementation) private {
        (bool success, ) = _implementation.delegatecall(msg.data);
        require(success, 'fail to call delegatecall');
        //console.logBytes(msg.data);
        // assembly {
        //     calldatacopy(0, 0, calldatasize())
        //     let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)
        //     returndatacopy(0, 0, returndatasize())
        //     switch result case 0 {revert(0, 0)} default {return (0, returndatasize())}
        // } 
    }

    receive() external payable {}
    fallback() external payable {
        _delegate(implementation());
    }
}