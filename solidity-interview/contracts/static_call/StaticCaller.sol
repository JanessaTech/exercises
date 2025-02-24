// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "contracts/static_call/StaticCallee.sol";

contract StaticCaller {
    function getName(address callee, uint256 id) public view returns(string memory) {
        //(bool ok, bytes memory res) = callee.staticcall(abi.encodeWithSignature('getName(uint256)', id));
        //(bool ok, bytes memory res) = callee.staticcall(abi.encodeWithSelector(StaticCallee.getName.selector, id));
        (bool ok, bytes memory res) = callee.staticcall(abi.encodeCall(StaticCallee.getName, (id)));
        require(ok, 'failed to call staticcall');
        return abi.decode(res, (string));
    }
}