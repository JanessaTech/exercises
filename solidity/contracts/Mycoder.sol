// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Mycoder {
    function encode(string memory name, uint age) public pure returns(bytes memory) {
        return abi.encode(name, age);
    }
    function decode(bytes calldata data) public pure returns(string memory _name, uint _age) {
        (_name, _age) = abi.decode(data, (string, uint));
    }
}