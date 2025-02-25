// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LockedERC20 is ERC20 {
    bool public transferable = false;
    address public owner;


    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, 'not owner');
        _;
    }

    modifier isTransferable() {
        require(transferable, 'not transferable');
        _;
    }

    function setTransferable(bool _choice) public isOwner {
        transferable = _choice;
    }

     function transfer(address to, uint256 value) 
        public override 
        isTransferable 
        returns (bool) {
        address _owner = _msgSender();
        _transfer(_owner, to, value);
        return true;
     }

}