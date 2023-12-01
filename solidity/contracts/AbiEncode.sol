// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IMyString {
    function strConcat(string memory , string memory) external returns(string memory);
}

contract AbiEncode {
    event log(bytes res, string strres);
    function test(address _contract, bytes calldata data) public returns(string memory) {
        (bool ok, bytes memory res) = _contract.call(data);
        require(ok, "call failed");
        emit log(res, string(res));
        return string(res);
    }

    function encodeWithSignature(
        string memory str1,
        string memory str2
    ) external pure returns (bytes memory) {
        return abi.encodeWithSignature("strConcat(string,string)", str1, str2);
    }

    function encodeWithSelector(
        string memory str1,
        string memory str2
    ) external pure returns (bytes memory) {
        return abi.encodeWithSelector(IMyString.strConcat.selector, str1, str2);
    }

    function encodeCall(string memory str1,string memory str2) external pure returns (bytes memory) {
        // Typo and type errors will not compile
        return abi.encodeCall(IMyString.strConcat, (str1, str2));
    }
}