// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyString {
    event log(string method);
    event logparams(string param1, string param2, string res);
    function strConcat(string memory str1, string memory str2) external returns(string memory) {
        string memory res = string.concat(str1, str2);
        emit logparams(str1, str2, res);
        return res;
    }
    fallback() external payable {
        emit log("fallback");
    }
    receive() external payable {
        emit log("receive");
    }
}