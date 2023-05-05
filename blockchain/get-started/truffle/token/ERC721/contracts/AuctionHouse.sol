// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./ERC721.sol";

contract AuctionHouse is ERC721{
    function register(address owner, uint id) public {
        _mint(owner, id);
    }

    function unregister(uint id) public {
        require(msg.sender == _ownerOf[id], "not owner");
        _burn(id);
    }
}