// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract TokenSwap {
    IERC20 token1;
    address owner1;

    IERC20 token2;
    address owner2;

    event Swap(address indexed from, address indexed to, uint256 amount);

    constructor(address _token1, address _owner1, address _token2, address _owner2) {
        token1 = IERC20(_token1);
        owner1 = _owner1;
        token2 = IERC20(_token2);
        owner2 = _owner2;
    }

    function swap(uint256 amount1, uint256 amount2) public {
        require(msg.sender == owner1 || msg.sender == owner2, 'Not Alice or Bob');
        require(token1.allowance(owner1, address(this)) >= amount1, 'token1 allowance is too low');
        require(token2.allowance(owner2, address(this)) >= amount2, 'token2 allowance is too low');
        _transferFrom(token1, owner1, owner2, amount1);
        _transferFrom(token2, owner2, owner1, amount2);
    }

    function _transferFrom(IERC20 token, address from, address to, uint256 amount) public {
        token.transferFrom(from, to, amount);
        emit Swap(from, to, amount);
    }
}