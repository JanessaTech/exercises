// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract GameItems is ERC1155, Ownable {
    uint256 public constant SWORD = 1;
    uint256 public constant POTION = 2;
    uint256 public constant SHIELD = 3;

    constructor(address initialOwner) 
        ERC1155("https://example.com/api/{id}.json") 
        Ownable(initialOwner) {
            _mint(msg.sender, SWORD, 1000, "");
            _mint(msg.sender, POTION, 2000, "");
            _mint(msg.sender, SHIELD, 3000, "");
    }
    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public onlyOwner {
        require(ids.length == values.length, 'ids.length != values.length');
        _mintBatch(to, ids, values, data);
    }

    function batchTransfer(
        address[] memory recipients, 
        uint256 id, 
        uint256 amountEach
    ) public {
        require(balanceOf(msg.sender, id) >= recipients.length * amountEach, 'not enough balance');
        for (uint256 i = 0; i < recipients.length; i++) {
            safeTransferFrom(msg.sender, recipients[i], id, amountEach, '');
        }
    }
}