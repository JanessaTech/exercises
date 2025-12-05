// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
// Uncomment this line to use console.log
import "hardhat/console.sol";

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Redo {
    string public name;
    string public symbol;
    uint8 decimals;
    uint256 totalSupply;

    mapping(address => uint256) _balances;
    mapping(address => mapping(address => uint256)) _allowances;
    mapping(address => bool) minters;

    bool private locked;

    event Mint(address indexed from, address indexed to, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approve(address indexed from, uint256 amount);

    modifier non_reentrant() {
        require(!locked, 'try to reentrant');
        locked = true;
        _;
        locked = false;
    }
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

    function mint(address to, uint256 amount) public onlyMinter {
        _balances[to] += amount;
        totalSupply += amount;
        emit Mint(msg.sender, to, amount);
    }

    function transfer(address to, uint256 amount) public {
        require(to != address(0), 'to is zero address');
        require(_balances[msg.sender] >= amount, 'no enough balance');
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function safeTransfer(address to, uint256 amount) public non_reentrant {
        transfer(to, amount);
    }

    function approve(address to, uint256 amount) public {
        _allowances[msg.sender][to] = amount;
        emit Approve(msg.sender, amount);
    }

    function transferFrom(address from, address to, uint256 amount) public {
        require(from != address(0), 'from is zero address');
        require(to != address(0), 'to is zero address');
        require(_balances[from] >= amount, 'no enough balance');
        require(_allowances[from][msg.sender] >= amount, 'no enough allowance');
        _balances[from] -= amount;
        _balances[to] += amount;
        _allowances[from][msg.sender] -= amount;
        emit Transfer(from, to, amount);
    }

    function balanceOf(address owner) public view returns(uint256) {
        return _balances[owner];
    }

}