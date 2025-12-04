// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract MyERC20Token {
    string public name;
    string public symbol;
    uint8 decimals;
    uint256 totalSupply;

    bool private locked;

    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint256)) _allowances;
    mapping(address => bool) minters;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Minter(address indexed minter, address indexed to, uint256 amount);

    modifier onlyMinter() {
        require(minters[msg.sender], 'not a minter');
        _;
    }
    modifier nonReentrant() {
        require(!locked, 'ReentrancyGuard: reentrant call');
        locked = true;
        _;
        locked = false;
    }

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        minters[msg.sender] = true;
    }

    function balanceOf(address owner) public view returns(uint256) {
        return _balances[owner];
    }

    function mint(address to, uint256 amount) public onlyMinter {
        totalSupply += amount;
        _balances[to] += amount;
        emit Minter(msg.sender, to, amount);
        emit Transfer(address(0), to, amount);
    }

    function transfer(address to, uint256 amount) public returns(bool) {
        require(to != address(0), 'ERC20: transfer to the zero address');
        require(_balances[msg.sender] >= amount, 'ERC20: transfer amount exceeds balance');
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function safeTransfer(address to, uint256 amount) public nonReentrant returns(bool)  {
        return transfer(to, amount);
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