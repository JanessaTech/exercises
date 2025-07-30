// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC20 is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("MyERC20", "MyERC20")
        Ownable(initialOwner)
    {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}