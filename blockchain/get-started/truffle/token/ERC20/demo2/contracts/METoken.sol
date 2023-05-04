pragma solidity ^0.8.0;
// SPDX-License-Identifier: UNLICENSED
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract METoken is ERC20 {
    uint constant _initial_supply = 2100000000;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, _initial_supply);
    }
}