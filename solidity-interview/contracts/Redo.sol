// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Redo is ERC1155, Ownable {
    uint256 public constant sword = 1;
    uint256 public constant potion = 2;
    uint256 public constant shield  = 3;

    constructor(address initOwner)
        ERC1155("http://test/{}.json")
        Ownable(initOwner) {
            _mint(msg.sender, sword, 1000, '');
            _mint(msg.sender, potion, 2000, '');
            _mint(msg.sender, shield, 3000, '');
        }
    function batchMint(address to, uint256[] memory ids, uint256[] memory values, bytes memory data) public onlyOwner {
        _mintBatch(to, ids, values, data);
    }
    function batchTransfer(address[] memory recipients, uint256 id, uint256 amount) public {
        require(balanceOf(msg.sender, id) >= recipients.length * amount, 'no enough');
        for (uint256 i = 0; i < recipients.length; i++) {
            safeTransferFrom(msg.sender, recipients[i], id, amount, '');
        }
    }
}