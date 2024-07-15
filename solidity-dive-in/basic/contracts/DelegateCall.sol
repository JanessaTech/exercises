// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Counter {
    event logger(address sender, uint res);
    uint cnt;
    function add(uint num) public returns(uint) {
        cnt += num;
        emit logger(msg.sender, cnt);
        return cnt;
    }
    function getData(uint num) public pure returns(bytes memory) {
        return abi.encodeWithSelector(this.add.selector, num);
    }
}

contract DelegateCaller {
    function test(address target, bytes memory data) public returns(bytes memory) {
        (bool success, bytes memory res) = target.delegatecall(data);
        require(success, 'Failed to call delegatecall');
        return res;
    }
}