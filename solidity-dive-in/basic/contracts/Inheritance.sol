// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract A {
    function foo() public pure virtual returns(string memory) {
        return 'A';
    }
}

contract B is A {
    function foo() public pure virtual override returns(string memory) {
        return 'B';
    }
}

contract C is A {
    function foo() public pure virtual override returns(string memory) {
        return 'C';
    }
}

contract D is B, C {
    function foo() public pure override(B, C) returns(string memory) {
        return super.foo();
    }
}

contract E is C, B {
    function foo() public pure override(C, B) returns(string memory) {
        return super.foo();
    }
}
