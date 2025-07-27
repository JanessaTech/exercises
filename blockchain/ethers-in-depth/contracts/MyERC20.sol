
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.20 and less than 0.9.0
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MyERC20 is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
    {}
    function mint(address to, uint256 amount) public onlyOwner{
        _mint(to, amount);
    }
}