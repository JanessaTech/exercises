// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface IAbiAndCallData {
    function register(address from, string memory name) external;
}

contract AbiAndCallData is IAbiAndCallData {
    mapping (address=>string) names;
    function register(address from, string memory name) public {
        names[from] = name;
    }

    function getName(address from) public view returns(string memory) {
        return names[from];
    }

    function test(bytes calldata data) public {
        (bool ok,) = address(this).call(data);
        require(ok, 'test failed');
    }

    function encodeWithSignature(address from, string memory name) public pure returns(bytes memory) {
        return abi.encodeWithSignature("register(address,string)", from, name);
    }

    function encodeWithSelector(address from, string memory name) public pure returns(bytes memory) {
        return abi.encodeWithSelector(IAbiAndCallData.register.selector, from, name);
    }

    function encodeCall(address from, string memory name) public pure returns(bytes memory) {
        return abi.encodeCall(IAbiAndCallData.register, (from, name));
    }

    function encodePacked(address from, string memory name) public pure returns(bytes memory) {
        return abi.encodePacked(bytes4(keccak256(bytes('register(address,string)'))), abi.encode(from, name));
    }

    function getSelector() public pure returns(bytes4) {
        return bytes4(keccak256(bytes('register(address,string)')));
    }

    function getData(address from, string memory name) public pure returns(bytes memory) {
        return abi.encode(from, name);
    }
}