pragma solidity ^0.5.16;

import "./Owned.sol";

contract Mortal is Owned {
    function destory() public onlyOwner {
        //selfdestruct(owner);
    }
}