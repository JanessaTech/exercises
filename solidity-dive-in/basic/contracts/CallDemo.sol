// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Receiver {
    event received(address sender, string mesg, uint256 num);
    function foo(string memory mesg, uint256 num) public payable{
        emit received(msg.sender, mesg, num);
    }
    
    fallback() external payable {
        emit received(msg.sender, 'fallback is called xxx', 0);
    }

    receive() external payable {
        emit received(msg.sender, 'receive is called yyyy', 0);
    }
}

contract Caller {
    event Response(bool success, bytes data);
    function testCallFoo(address payable to) public payable {
        (bool success, bytes memory data) = to.call(abi.encodeWithSignature("foo(string,uint256)", "call foo", 123));
        emit Response(success, data);
    }
    function testCallDoesNotExist(address payable to) public payable {
        (bool success, bytes memory data) = to.call(abi.encodeWithSignature("doesNotExist()"));
        emit Response(success, data);
    }
}

