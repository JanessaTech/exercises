// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

interface ERC20 {
    function totalSupply() external view returns(uint256);
    function balanceOf(address owner) external view returns(uint256);
    function allowance(address from, address spender) external view returns(uint256);
    function transfer(address to, uint256 amount) external returns(bool);
    function approve(address spender, uint256 amount) external returns(bool);
    function transferFrom(address from, address to, uint256 amount) external returns(bool);
}

contract Redo is ERC20 {
    uint256 public totalSupply;
    string public name;
    string public symbol;
    uint8 decimals;

    mapping(address => bool) minters;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        minters[msg.sender] = true;
    }

    function mint(address to, uint256 amount) external {
        require(minters[msg.sender], 'not minter');
        require(to != address(0), 'to is zero address');
        balanceOf[to] = amount;
        totalSupply += amount;
    }

    function transfer(address to, uint256 amount) external returns(bool) {
        require(to != address(0), 'to is zero');
        require(balanceOf[msg.sender] >= amount, 'no enough balance');
        balanceOf[msg.sender] -= amount;
        balanceOf[msg.sender] += amount;
        return true;
    }

    function approve(address spender, uint256 amount) external returns(bool){
        require(spender != address(0), 'spender is zero address');
        allowance[msg.sender][spender] = amount;
        return true;
    }
    function transferFrom(address from, address to, uint256 amount) external returns(bool){
        require(from != address(0), 'from is zero');
        require(to != address(0), 'to is zero');
        require(balanceOf[from] >= amount, 'no enough balance');
        require(allowance[from][msg.sender] >= amount, 'no enough allowance');
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
    }
}