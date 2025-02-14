// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MultiSigWallet {
    address[] public owners;
    uint256 numConfirmRequired;
    mapping(uint256 => mapping(address => bool)) isConfirm;
    mapping(address => bool) isOwner;

    event SubmitTx(address indexed owner, uint256 indexed txId);
    event ConfirmTx(address indexed owner, uint256 indexed txId);
    event RevokeTx(address indexed owner, uint256 indexed txId);
    event ExecuteTx(address indexed owner, uint256 indexed txId);

    struct Transaction {
        address to;
        bytes data;
        bool executed;
        uint256 confirms;
    }
    Transaction[] public transactions;

    constructor(address[] memory _owners, uint256 _numConfirmRequired) {
        require(_owners.length > 0, 'the size of owners should be greater than 0');
        require(_numConfirmRequired > 0 && _numConfirmRequired <= _owners.length, 'invalid numConfirmRequired');
        numConfirmRequired = _numConfirmRequired;
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), 'invalid owner');
            require(!isOwner[owner], 'owner should be unique');
            isOwner[owner] = true;
            owners.push(owner);
        }
    }

    modifier onlyOwner() {
        require(isOwner[msg.sender], 'only owner');
        _;
    }

    modifier txExist(uint256 txId) {
        require(txId < transactions.length, 'tx does not exist');
        _;
    }
    modifier notExcuted(uint256 txId) {
        Transaction storage transaction = transactions[txId];
        require(!transaction.executed, 'tx is executed');
        _;
    }
    modifier notConfirm(uint256 txId) {
        require(!isConfirm[txId][msg.sender], 'tx is confirmed');
        _;
    }

    function getOwners() public view returns(address[] memory) {
        return owners;
    }

    function submitTransaction(address to, bytes memory data) 
        public 
        onlyOwner {
            uint256 txId = transactions.length;
            Transaction memory transaction = Transaction({
                to: to,
                data: data,
                executed: false,
                confirms: 0
            });
            transactions.push(transaction);
            emit SubmitTx(msg.sender, txId);
    }

    function confirmTransaction(uint256 txId) 
        public 
        onlyOwner
        txExist(txId)
        notConfirm(txId)
        notExcuted(txId) {
            Transaction storage transaction = transactions[txId];
            transaction.confirms += 1;
            isConfirm[txId][msg.sender] = true;   

            emit ConfirmTx(msg.sender, txId);
    }

    function revokeConfirm(uint256 txId)
        public
        onlyOwner
        txExist(txId)
        notExcuted(txId) {
        Transaction storage transaction = transactions[txId];
        require(isConfirm[txId][msg.sender], 'Tx is not confirmed');
        transaction.confirms -= 1;
        isConfirm[txId][msg.sender] = false;

        emit RevokeTx(msg.sender, txId);
    }

    function executeTransaction(uint256 txId)
        public
        onlyOwner
        txExist(txId)
        notExcuted(txId) {
            Transaction storage transaction = transactions[txId];
            require(transaction.confirms >= numConfirmRequired, 'numConfirmRequired is enough');
            (bool success, ) = transaction.to.call(transaction.data);
            require(success, 'failed to call dummy');
            transaction.executed = true;

            emit ExecuteTx(msg.sender, txId);
    }

    function getTransactionSize() public view returns(uint256) {
        return transactions.length;
    }

    function getTransaction(uint256 txId) 
        public 
            view returns(
                address to,
                bytes memory data,
                bool executed,
                uint256 confirms
            ) {
            Transaction storage transaction = transactions[txId];
            return (
                transaction.to,
                transaction.data,
                transaction.executed,
                transaction.confirms);
    }



    fallback() external payable {}
    receive() external payable {}
} 