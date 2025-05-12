// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Redo {
    uint256 public _valuePlaceHolder;
    bytes32 private constant ADMIN_SLOT = keccak256('ADMIN_SLOT');
    bytes32 private constant IMPLEMENTATION = keccak256('IMPLEMENTATION');

    constructor(address _implemenation) {
        bytes32 slot = IMPLEMENTATION;
        assembly {
            sstore(slot, _implemenation)
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
    function implementation() public view returns(address impl) {
        bytes32 slot = IMPLEMENTATION;
        assembly {
            impl := sload(slot)
        }
    }

    function value() public view returns(uint256) {
        return _valuePlaceHolder;
    }

    function upgradeTo(address _newImplementation) public {
        bytes32 slot = IMPLEMENTATION;
        assembly {
            sstore(slot, _newImplementation)
        }
    }

    function _deletegate(address _implementation) private {
        (bool success,) = _implementation.delegatecall(msg.data);
        require(success, 'failed to call delegatecall');
    }

    fallback() external payable {
        _deletegate(implementation());
    }

    receive() external payable {}
}