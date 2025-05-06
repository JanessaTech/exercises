// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Redo {
    uint256 private valuePlaceHolder;
    bytes32 private constant ADMIN_SLOT = keccak256('ADMIN_SLOT');
    bytes32 private constant IMPLEMENTATION = keccak256('IMPLEMENTATION');

    constructor(address _implementation) {
        bytes32 slot = IMPLEMENTATION;
        assembly {
            sstore(slot, _implementation)
        }
        slot = ADMIN_SLOT;
        assembly {
            sstore(slot, caller())
        }
    }

    function admin() public view returns(address adm) {
        bytes32 slot = ADMIN_SLOT;
        assembly {
            adm := sload(slot)
        }
    }
    function implementation() public view returns(address imp) {
        bytes32 slot = IMPLEMENTATION;
        assembly {
            imp := sload(slot)
        }
    }

    function upgradeTo(address _newImplementation) external {
        bytes32 slot = IMPLEMENTATION;
        assembly {
            sstore(slot, _newImplementation)
        }
    }

    function getCallData(uint256 _value) external pure returns(bytes memory) {
        return abi.encodeWithSignature('setValue(uint256)', _value);
    }

    function value() external view returns(uint256) {
        return valuePlaceHolder;
    }

    function _delegate(address _implementation) private {
        (bool success, ) = _implementation.delegatecall(msg.data);
        require(success, 'failed to call delegatecall');
    }

    fallback() external payable {
        _delegate(implementation());
    }
    receive() external payable {}
}