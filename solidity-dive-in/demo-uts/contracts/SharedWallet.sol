// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract SharedWallet {
    event DepositeFunds(address indexed from, uint256 amount);
    event WithdrawFunds(address indexed from, uint256 amount);
    event TransferFunds(address indexed from, uint256 amount);
    
    mapping(address => uint256) ownerIndex;
    address[] owners;

    constructor() {
        ownerIndex[msg.sender] = owners.length;
        owners.push(msg.sender);
    }

    modifier isOwner() {
        uint256 index = ownerIndex[msg.sender];
        require((index == 0 && owners[0] == msg.sender) || index > 0, 'You are not owner'); 
        _;
    }

    modifier isValid(address owner) {
        require(owner != address(0), 'Invalid address');
        _;
    }

    function addOwner(address newOwner) public 
        isOwner
        isValid(newOwner) {
            require(msg.sender != newOwner, 'You can not add youself as a new owner');
            ownerIndex[newOwner] = owners.length;
            owners.push(newOwner);
    }

    function removeOwner(address removedOwner) public 
        isOwner
        isValid(removedOwner) {
            require(getOwnersSize() > 1, 'There is only one owner left');
            uint256 index = ownerIndex[removedOwner];
            if (index == 0) {
                require(owners[index] == removedOwner, 'The address to be removed is not an owner');
            }
            removeOwnerByIndex(index);
    }

    function removeOwnerByIndex(uint256 index) private {
        require(index < owners.length, 'index is invalid');
        address removedOwner = owners[index];
        if (index == owners.length - 1) {
            // the last one
            owners.pop();
            delete ownerIndex[removedOwner];
        } else {
            address lastOwner = owners[owners.length - 1];
            owners[index] = lastOwner;
            ownerIndex[lastOwner] = index;
            owners.pop();
            delete ownerIndex[removedOwner];
        }
    }

    function getOwnersSize() public view returns(uint256) {
        return owners.length;
    }

    function withdraw(uint256 amount) public 
    isOwner {
        require(address(this).balance >= amount, 'not enough balance');
        payable(msg.sender).transfer(amount);
        emit WithdrawFunds(msg.sender, amount);
    }

    function transfer(address payable to, uint256 amount) public 
        isOwner
        isValid(to) {
        require(address(this).balance >= amount, 'not enough balance');
        to.transfer(amount);
        emit TransferFunds(msg.sender, amount);
    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    fallback() external payable {
        emit DepositeFunds(msg.sender, msg.value);
    }

    receive() external payable {
        emit DepositeFunds(msg.sender, msg.value);
    }
    
}