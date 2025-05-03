// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
// import "hardhat/console.sol";

// it doesn't work 

contract ParseCalldata {
    function getCallData(address _add, uint256 _amount) public pure returns(bytes memory) {
        return abi.encodeWithSignature("register(address,uint256)", _add, _amount);
    }

    function parse(bytes calldata data) public pure returns(address to, uint256 amount) {
        require(data.length >= 4 + 32 + 32, "Invalid calldata");
        assembly {
            to := calldataload(4)           // Skip selector (first 4 bytes)
            amount := calldataload(36)      // Next 32 bytes (after address)
        }
    }
}

