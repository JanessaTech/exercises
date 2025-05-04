// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Proxy {
    // Unstructured storage slot for implementation address (ERC1967 standard)
    bytes32 private constant _IMPLEMENTATION_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    // Unstructured storage slot for admin (optional, but recommended)
    bytes32 private constant _ADMIN_SLOT =
        0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;

    constructor(address _implementation) {
        // Store implementation address in fixed slot
        bytes32 slot = _IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _implementation)
        }

        // Optional: Set admin (msg.sender)
        slot = _ADMIN_SLOT;
        assembly {
            sstore(slot, caller())
        }
    }

    // Get current implementation address
    function implementation() public view returns (address impl) {
        bytes32 slot = _IMPLEMENTATION_SLOT;
        assembly {
            impl := sload(slot)
        }
    }

    // Get admin address
    function admin() public view returns (address adm) {
        bytes32 slot = _ADMIN_SLOT;
        assembly {
            adm := sload(slot)
        }
    }

    // Upgrade to a new implementation (admin-only)
    function upgradeTo(address _newImplementation) external {
        require(msg.sender == admin(), "Proxy: Not admin");
        bytes32 slot = _IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _newImplementation)
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

    // Delegate all calls to the implementation contract
    fallback() external payable {
        // address impl = implementation();
        // assembly {
        //     // Copy calldata to memory
        //     calldatacopy(0, 0, calldatasize())

        //     // Delegatecall to implementation
        //     let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)

        //     // Copy returndata to memory
        //     returndatacopy(0, 0, returndatasize())

        //     // Revert or return based on result
        //     switch result
        //     case 0 { revert(0, returndatasize()) }
        //     default { return(0, returndatasize()) }
        // }
        _delegate(implementation());
    }
    receive() external payable {}

    function getCalldata(uint256 value) public pure returns(bytes memory) {
        return abi.encodeWithSignature("setValue(uint256)", value);
    }
}