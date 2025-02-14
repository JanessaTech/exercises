// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
contract Dummy {
    string _msg = '';
    function set(string memory message) public {
        _msg = message;
    }
    function get() public view returns(string memory) {
        return _msg;
    }
    // you could input the output(bytes) in remix to simulate the calling of set
    function getCallData(string memory message) public pure returns(bytes memory){
        return abi.encodeWithSignature("set(string)", message);
    }
    receive() external payable {}
    fallback() external payable {}
}