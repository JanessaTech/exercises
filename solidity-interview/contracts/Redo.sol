// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

contract Redo {
    uint256 public value;
    
    bytes32 private constant ADMIN_SLOT = keccak256('ADMIN_SLOT');
    bytes32 private constant IMPLEMENTATION_SLOT = keccak256('IMPLEMENTATION_SLOT');

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
    function implememtation() public view returns(address impl) {
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            impl := sload(slot)
        }
    }
    function toUpgrade(address _implemenation) public {
        require(admin() == msg.sender, 'not owner');
        bytes32 slot = IMPLEMENTATION_SLOT;
        assembly {
            sstore(slot, _implemenation)
        }
    }

    function _delegate(address _implementation) private {
        (bool success, ) = _implementation.delegatecall(msg.data);
        require(success, 'failed to call delegatecall');
    }

    fallback() external payable{
        _delegate(implememtation());
    }
    receive() external payable{}
}
