// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract StaticCallee {
    mapping(uint256 => string) names;

    function setName(uint256 id, string memory name) public {
        names[id] = name;
    }

    function getName(uint256 id) public view returns(string memory) {
        return names[id];
    }

    function getHardCodeName() public pure returns(string memory) {
        return 'StaticCallee';
    }
}