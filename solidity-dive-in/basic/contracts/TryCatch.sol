// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Foo {
    function test(uint num) public pure returns(string memory) {
        require(num > 0, 'input must be greater than 0');
        if (num == 1) {
            revert('input is 1');
        }
        assert(num != 2);
        return 'ok';
    }
}

contract Bar {
    Foo foo;
    constructor() {
        foo = new Foo();
    }
    event Log(string reason);
    event Logbytes(bytes reason);

    function call(uint num) public {
        try foo.test(num) returns(string memory res) {
            emit Log(res);
        } catch Error(string memory reason) {
            emit Log(reason); // catch require or revert
        } catch (bytes memory reason) {
            emit Logbytes(reason); //catch assert
        }
    }

}