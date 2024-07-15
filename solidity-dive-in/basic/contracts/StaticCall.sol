// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract TestMultiCall {
    function test(uint256 _i) external pure returns (uint256) {
        return _i;
    }

    function getData(uint256 _i) external pure returns (bytes memory) {
        return abi.encodeWithSelector(this.test.selector, _i);
    }
}

contract StaticCall {
    function test(address caller, bytes memory data) public view returns(bytes memory){
        (bool success, bytes memory result) = caller.staticcall(data);
        require(success, 'failed to call static call');
        return result;
    }
}