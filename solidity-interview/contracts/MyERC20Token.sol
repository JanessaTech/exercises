// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

interface ERC20 {
    function totalSupply() external view returns(uint256);
    function balanceOf(address owner) external view returns(uint256);
    function allowance(address owner, address spender) external view returns(uint256);
    function transfer(address to, uint256 amount) external returns(bool);
    function approve(address spender, uint256 amount) external returns(bool);
    function transferFrom(address from, address to, uint256 amount) external returns(bool);
}

contract MyERC20Token is ERC20 {
    event Mint(address indexed minter, address indexed to, uint256 amount);
    event Approve(address indexed from, address indexed spender, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    uint256 public totalSupply;
    string public name;
    string public symbol;
    uint8 public decimals;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => bool) minters;

    modifier onlyMinter() {
        require(minters[msg.sender], 'not minter');
        _;
    }

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        minters[msg.sender] = true;
    }

    function mint(address to, uint256 amount) external onlyMinter {
        require(to != address(0), 'to is zero address');
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function transfer(address to, uint256 amount) external returns(bool){
        require(to != address(0), 'to is zero address');
        require(balanceOf[msg.sender] >= amount, 'not enough balance');
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns(bool){
        require(spender != address(0), 'spender is zero address');
        allowance[msg.sender][spender] = amount;
        emit Approve(msg.sender, spender, amount);
        return true;
    }
    function transferFrom(address from, address to, uint256 amount) external returns(bool) {
        require(from != address(0), 'from is zero address');
        require(to != address(0), 'to is zero address');
        require(balanceOf[from] >= amount, 'not enough balance');
        require(allowance[from][msg.sender] >= amount,'not enough allowance');
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
        return true;
    }
}