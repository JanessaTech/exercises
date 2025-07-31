// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ApproveTransferFromDelegator {
    IERC20 token;

    address owner;
    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) public {
        require(owner == msg.sender, 'not owner');
        token.transferFrom(msg.sender, to, amount);
    }
}