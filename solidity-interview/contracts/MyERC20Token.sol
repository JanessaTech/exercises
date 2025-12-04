// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract MyERC20Token {
    string public name;
    string public symbol;
    uint8 decimals;
    uint256 totalSupply;

    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint256)) _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply * 10 ** _decimals;
        _balances[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }

    function balanceOf(address owner) public view returns(uint256) {
        return _balances[owner];
    }

    function transfer(address to, uint256 amount) public returns(bool) {
        require(to != address(0), 'ERC20: transfer to the zero address');
        require(_balances[msg.sender] >= amount, 'ERC20: transfer amount exceeds balance');
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) public returns(bool) {
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) public returns(bool) {
        require(from != address(0), 'ERC20: transfer from the zero address');
        require(to != address(0), 'ERC20: transfer to the zero address');
        require(_balances[from] >= amount, 'ERC20: transfer amount exceeds balance');
        require(_allowances[from][msg.sender] >= amount, 'ERC20: transfer amount exceeds allowance');
        _balances[from] -= amount;
        _balances[to] += amount;
        _allowances[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }
}