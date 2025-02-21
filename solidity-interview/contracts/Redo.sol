// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Redo {
    IERC20 token1;
    address owner1;
    IERC20 token2;
    address owner2;

    constructor(address _token1, address _owner1, address _token2, address _owner2) {
        token1 = IERC20(_token1);
        owner1 = _owner1;
        token2 = IERC20(_token2);
        owner2 = _owner2;
    }
    modifier isOwner() {
        require(msg.sender == owner1 || msg.sender == owner2, 'Not owner');
        _;
    }

    function swap(uint256 amount1, uint256 amount2) public isOwner {
        require(token1.allowance(owner1, address(this)) >= amount1, 'allowance in token1 is too low');
        require(token2.allowance(owner2, address(this)) >= amount2, 'allowance in token2 is too low');
        _transferFrom(token1, owner1, owner2, amount1);
        _transferFrom(token2, owner2, owner1, amount2);
    }

    function _transferFrom(IERC20 token, address from, address to, uint256 amount) public {
        token.transferFrom(from, to, amount);
    }
}