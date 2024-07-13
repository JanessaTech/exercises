// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract EncodeDecode {
    function encode(string memory name, uint age, bool status) public pure returns (bytes memory) {
        return abi.encode(name, age, status);
    }

    function decode(bytes memory data) public pure returns(string memory name, uint age, bool status) {
        (name, age, status) = abi.decode(data,(string, uint, bool));
    }

    function collision(string memory str1, string memory str2) public pure returns(bytes32) {
        return keccak256(abi.encodePacked(str1, str2));
    }
    
}