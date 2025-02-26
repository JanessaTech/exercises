// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract RouletteAttack {
    uint256 pastTimeStamp;

    event SendEth(address indexed from, uint256 amount);

    constructor () payable {}

    function spin() public payable {
        require(msg.value == 1 ether, 'need 1 eth');
        require(block.timestamp != pastTimeStamp, 'block.timestamp == pastTimeStamp');
        console.log(block.timestamp);
        if (block.timestamp % 7 == 0) {
            uint256 amount = address(this).balance;
             (bool sent, ) = msg.sender.call{value: amount}("");
              require(sent, 'failed to send ether');
              emit SendEth(msg.sender, amount);
        }
    }
}
