// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract Redo {
    uint256  valuePlaceHolder;

    bytes32 private ADMIN_SLOT = keccak256('ADMIN_SLOT');
    bytes32 private IMPLEMENTATION_SLOT = keccak256('IMPLEMENTATION_SLOT');

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

    function admin() public view returns(address adm) {
        bytes32 slot = ADMIN_SLOT;
        assembly {
            adm := sload(slot)
        }
    }

    function implementation() public view returns(address impl) {
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            impl := sload(slot)
        }
    }

    function value() public view returns(uint256) {
        return valuePlaceHolder;
    }

    function upgradeTo(address _newImplementation) public {
        require(msg.sender == admin(), 'not owner');
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _newImplementation)
        }
    }

    function _delegate(address _implemantion) private {
        (bool success, ) = _implemantion.delegatecall(msg.data);
        require(success, 'failed to call delegate');
    }


    fallback() external payable {
        _delegate(implementation());
    }
    receive() external payable {}
}