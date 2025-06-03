// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Redo {
    uint256 public value;

    bytes32 private constant ADMIN_SLOT = keccak256("ADMIN_SLOT");
    bytes32 private constant IMPLEMENTATION_SLOT = keccak256("IMPLEMENTATION_SLOT");

    constructor(address _impelmentation) {
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _impelmentation)
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
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            imp := sload(slot)
        }
    }

    function upgradeTo(address _implementation) public {
        require(msg.sender == admin(), 'not owner');
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _implementation)
        }
    }

    function _delegate(address _impelmenation) private {
        (bool success, ) = _impelmenation.delegatecall(msg.data);
        require(success, 'failed to call delegegatecall');
    }

    fallback() external payable {
        _delegate(implementation());
    }

    receive() external payable {}

}