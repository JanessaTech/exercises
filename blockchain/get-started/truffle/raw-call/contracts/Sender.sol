pragma solidity ^0.8.19;
import "./Receiver.sol";
// SPDX-License-Identifier: UNLICENSED
contract Sender {
    address payable _receiver;
    constructor(address payable _r) {
        _receiver = _r;
    }

    event log(string functionName, bool success, bytes res);

    function setName(string memory newName) public payable {
        (bool success, bytes memory data) = _receiver.call{value: msg.value}(
            abi.encodeWithSignature("setName(string)", newName)
        );

        emit log("setName", success, data);
    }

    function getReceiverName() public view returns(string memory) {
        return Receiver(_receiver).getName();
    }

    function sendEther() public payable{
        (bool success, bytes memory data) = _receiver.call{value: msg.value}('');  // no data provided in this case
        emit log("sendEther", success, data);
    }

}