pragma solidity ^0.8.19;
import "./ArrayLib.sol";
// SPDX-License-Identifier: UNLICENSED
contract TestArray {
    using ArrayLib for uint[];
    uint[] public arr;
    function testArrayRemove() public {
        for (uint i = 0; i < 3; i++) {
            arr.push(i);
        }

        arr.remove(1);

        assert(arr.length == 2);
        assert(arr[0] == 0);
        assert(arr[1] == 2);
    }
}