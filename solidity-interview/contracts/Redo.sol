// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Redo is ERC1155, Ownable {
    uint256 public constant SWORD = 1;
    uint256 public constant POTION = 2;
    uint256 public constant SHEILD = 3;

    constructor(address initialOwner) 
        ERC1155("http://test.com/{id}.json") 
        Ownable(initialOwner) {
            _mint(msg.sender, SWORD, 1000, '');
            _mint(msg.sender, POTION, 3000, '');
            _mint(msg.sender, SHEILD, 3000, '');
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory values, bytes memory data) public onlyOwner {
        require(ids.length == values.length, 'ids.length != values.length');
        _mintBatch(to, ids, values, data);
    }

    function batchTransfer(address[] memory recipients, uint256 id, uint256 amount) public {
        require(balanceOf(msg.sender, id) >= recipients.length * amount);
        for (uint256 i = 0; i < recipients.length; i++) {
            safeTransferFrom(msg.sender, recipients[i], id, amount, '');
        }
    }
}