// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Swaper {
    IERC20 public token1;
    IERC20 public token2;
    address public owner1;
    address public owner2;

    constructor(
            address _token1, 
            address _owner1,
            address _token2,
            address _owner2
            ) {
                token1 = IERC20(_token1);
                token2 = IERC20(_token2);
                owner1 = _owner1;
                owner2 = _owner2;
            }

}