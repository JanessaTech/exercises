// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract MyERC1155 is ERC1155 {
    constructor() ERC1155('') {}
    
    function batchMint(address to, uint256[] calldata ids, uint256[] calldata values, bytes memory data) public {
        _mintBatch(to, ids, values, data);
    }

    function mint(address to, uint256 id, uint256 value, bytes memory data) public{
        _mint(to, id, value, data);
    }
}