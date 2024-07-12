// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface ICounter {
    function count() external view returns(uint);
    function inc() external;
}

contract MyCounter {
    uint private cnt;
    function count() external view returns(uint) {
        return cnt;
    }
    function inc() external {
        cnt += 1;
    }
}

contract MyContract {
    ICounter private counter;

    constructor(ICounter _counter) {
        counter = _counter;
    }

    function getCount() public view returns(uint) {
        return counter.count();
    }

    function increment() public {
        counter.inc();
    }
}