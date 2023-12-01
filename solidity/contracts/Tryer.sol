// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "./Catcher.sol";

contract Tryer {
    event Log(string message);
    event LogBytes(bytes message);

    Catcher public catcher;
    constructor() {
        catcher = new Catcher(msg.sender);
    }
    
    function tryCatchNewContract(address _owner) public {
        try new Catcher(_owner) returns(Catcher _catcher) {
            emit Log("new catcher is created");
        } catch Error(string memory reason) {
            emit Log(reason);
        } catch(bytes memory reason) {
            emit LogBytes(reason);
        }

    }

    function tryCatchExternalCall(uint i) public {
        
        try catcher.myFun(i) returns(string memory res) { // error thrown by require or revert will be catched here
            emit Log(res);
        } catch Error(string memory reason) { // error thrown by require or revert will be catched here
            emit Log(reason);
        } catch(bytes memory reason) { // error thrown by assert will be catched here
            emit LogBytes(reason);
        }

    }

}