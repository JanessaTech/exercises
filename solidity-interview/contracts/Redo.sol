// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";


contract Redo {
    uint256 public value;
    bytes32 private constant IMPLEMENATION_SLOT = keccak256('IMPLEMENATION_SLOT');
    bytes32 private constant ADMIN_SLOT = keccak256('ADMIN_SLOT');

    constructor(address _implementation) {
        bytes32 slot = IMPLEMENATION_SLOT;
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
        bytes32 slot = IMPLEMENATION_SLOT;
        assembly {
            imp := sload(slot)
        }
    }

    function upgradeTo(address _implemantion) public {
        require(admin() == msg.sender, 'not admin');
        bytes32 slot = IMPLEMENATION_SLOT;
        assembly {
            sstore(slot, _implemantion)
        }
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