// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Enum {
    enum Status{
        init,
        progressing, 
        done
    }

    Status public status;
    function getStatus() public view returns(Status) {
    return status;
    }
    function setStatus(Status _s) public {
        status = _s;
    }
    function reset() public {
        delete status;
    }


}