
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ErrorDemo {
    uint public number;


    error customError(uint num);

    function setNumber(uint num) public {
        require(num > 20, "num must be greater than 20");
        if (num > 30) {
            revert("number cannot be greater than 30");
        }
        if(num < 25) {
            revert customError(num);
        }
        number = num;

    }
}
