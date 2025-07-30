// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ApproveTransferFromDelegator {
    IERC20 token;
    constructor(address _token) {
        token = IERC20(_token);
    }

    function transfer(address to, uint256 amount) public {
        token.transferFrom(msg.sender, to, amount);
    }
}