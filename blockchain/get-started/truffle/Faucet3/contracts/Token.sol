pragma solidity ^0.5.16;

import "./Mortal.sol";
import "./Faucet.sol";

contract Token is Mortal {
    Faucet _faucet;
    constructor() public {
       _faucet = new Faucet();
    }

    function getFaucetName() public view returns(string memory) {
        return _faucet.getName();
    }
}