// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Called {
  event callEvent(address sender, address origin, address from);
  function callMe() public {
    emit callEvent(msg.sender, tx.origin, address(this));
  }
}