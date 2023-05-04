pragma solidity ^0.8.0;
// SPDX-License-Identifier: UNLICENSED
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./METoken.sol";

contract Agent {
    ERC20 public meToken;
    address public tokenOwner;

    constructor(address _meToken, address meOwner) {
        meToken = ERC20(_meToken);
        tokenOwner = meOwner;
    }

    function transfer(address to, uint amount) public{
        meToken.transferFrom(tokenOwner, to, amount);
    }

    fallback () external payable{
        revert("fallback in Agent");
    }
    
}