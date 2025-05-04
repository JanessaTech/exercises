// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Proxy {
    uint256 private _valuePlaceholder;  // 与 LogicV1.value 共享 Slot 0

    // Unstructured storage slot for implementation address (ERC1967 standard)
    bytes32 private constant _IMPLEMENTATION_SLOT = keccak256('implementation_slot');

    // Unstructured storage slot for admin (optional, but recommended)
    bytes32 private constant _ADMIN_SLOT = keccak256('owner_slot');

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

    function value() external view returns (uint256) {
        return _valuePlaceholder;
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
        assembly {
            // Copy calldata to memory
            calldatacopy(0, 0, calldatasize())

            // Delegatecall to implementation
            let result := delegatecall(gas(), _implementation, 0, calldatasize(), 0, 0)

            // Copy returndata to memory
            returndatacopy(0, 0, returndatasize())

            // Revert or return based on result
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }

    // Delegate all calls to the implementation contract
    fallback() external payable {
        _delegate(implementation());
    }
    receive() external payable {}

    function getCalldata(uint256 _value) public pure returns(bytes memory) {
        return abi.encodeWithSignature("setValue(uint256)", _value);
    }
}