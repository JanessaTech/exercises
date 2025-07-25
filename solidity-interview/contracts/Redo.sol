// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Redo {
   uint256 public value;
   
   bytes32 private constant ADMIN_SLOT = keccak256('ADMIN_SLOT');
   bytes32 private constant IPLEMENTATION_SLOT = keccak256('IPLEMENTATION_SLOT');
   
   constructor(address _implementation) {
      bytes32 slot = IPLEMENTATION_SLOT;
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
   function implememtation() public view returns(address impl) {
      bytes32 slot = IPLEMENTATION_SLOT;
      assembly {
         impl := sload(slot)
      }
   }

   function upgradeTo(address _implementation) public {
      require(msg.sender == admin(), 'not admin');
      bytes32 slot = IPLEMENTATION_SLOT;
      assembly {
         sstore(slot, _implementation)
      }
   }

   function _delegate(address _implementation) private {
      (bool success, ) = _implementation.delegatecall(msg.data);
      require(success, 'failed to call delegatecall');
   }

   fallback() external payable{
      _delegate(implememtation());
   }
   receive() external payable {}

}