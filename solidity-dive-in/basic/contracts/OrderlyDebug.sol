// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "hardhat/console.sol";


contract OrderlyDebug {
    event logger(address indexed sender, uint256 newValue);

    uint256 inc;

    function add(uint256 num) public {
        console.log("num:", num);
        inc += 10;
        require(num >= 2, ' num is less than 2');
        inc += num;
        emit logger(msg.sender, inc);
    }

    function get() public view returns(uint256) {
        return inc;
    }

}