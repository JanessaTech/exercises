// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.20 and less than 0.9.0
pragma solidity ^0.8.20;

contract HelloWorld {
    string mesg = 'default message';
    event logger(address indexed from, string mesg);

    function setMsg(string memory _mesg) public {
        mesg = _mesg;
        emit logger(msg.sender, _mesg);
    }
    function getMsg() public view returns(string memory){
        return mesg;
    }
}