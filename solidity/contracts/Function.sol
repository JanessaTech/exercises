
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Functions {
    string public name;
    uint public age;

    function someFun(string memory _name, uint _age) public {
       _fun({_nn: _name, _gg: _age});

    }
    function _fun(string memory _nn, uint _gg) internal {
        name = _nn;
        age = _gg;
    }

}