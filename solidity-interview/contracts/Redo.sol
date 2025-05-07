// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Redo {
    uint256 _valuePlaceHolder;
    bytes32 private constant ADMIN_SLOT = keccak256('ADMIN_SLOT');
    bytes32 private constant IMPLEMENTATION_SLOT = keccak256('IMPLEMENTATION_SLOT');

    constructor(address _implementation) {
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _implementation)
        }
        slot = ADMIN_SLOT;
        assembly {
            sstore(slot, caller())
        }
    }

    function value() external view returns(uint256) {
        return _valuePlaceHolder;
    }

    function admin() public view returns(address adm) {
        bytes32 slot = ADMIN_SLOT;
        assembly {
            adm := sload(slot)
        }
    }
    function implementation() public view returns(address imp) {
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            imp := sload(slot)
        }
    }

    function getCallData(uint256 _value) external pure returns(bytes memory) {
        return abi.encodeWithSignature('setValue(uint256)', _value);
    }
    function upgradeTo(address _newImplementation) public {
        require(msg.sender == admin(), 'not admin');
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _newImplementation)
        }
    }

    function _deletegate(address _implementation) private {
        (bool success, ) = _implementation.delegatecall(msg.data);
        require(success, 'it failed to call delegatecall');
    }

    fallback() external payable {
        _deletegate(implementation());
    }
    receive() external payable {}

}