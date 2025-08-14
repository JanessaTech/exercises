// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Redo is ERC1155, Ownable {
   uint256 private constant SWORD = 1;
   uint256 private constant POTION = 2;
   uint256 private constant SHEILD = 3;

    constructor(address initialOwner) 
      ERC1155("http://test.com/{id}.json") 
      Ownable(initialOwner) {
         _mint(msg.sender, SWORD, 1000, '');
         _mint(msg.sender, POTION, 1000, '');
         _mint(msg.sender, SHEILD, 1000, '');
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory values, bytes memory data) public onlyOwner {
      require(ids.length == values.length, 'ids.length != values.length');
      _mintBatch(to, ids, values, data);
    }
    function transferBatch(address[] memory recipients, uint256 id, uint256 amount) public {
      require(balanceOf(msg.sender, id) >= recipients.length * amount, 'no enough');
      for (uint256 i = 0; i < recipients.length; i++) {
         _safeTransferFrom(msg.sender, recipients[i], id, amount, '');
      }
    }
}