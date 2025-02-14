// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Redo {
    address[] owners;
    uint256 numConfirm;
    mapping(address => bool) isOwner;
    mapping(uint256 => mapping(address => bool)) isConfirm;

    event SubmitTx(address indexed owner, uint256 indexed txId);
    event ConfirmTx(address indexed owner, uint256 indexed txId);
    event RevokeTx(address indexed owner, uint256 indexed txId);
    event ExecuteTx(address indexed owner, uint256 indexed txId);

    constructor(address[] memory _owners, uint256 _numConfirm) {
        require(_owners.length > 0, 'owners is empty');
        require( _numConfirm > 0 && _owners.length >= _numConfirm, 'invalid _numConfirm');
        numConfirm = _numConfirm;
        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), 'Invalid owner');
            require(!isOwner[owner], 'duplicated owner');
            owners.push(owner);
            isOwner[owner] = true;
        }
    }

    struct Transaction {
        address to;
        bytes data;
        uint256 confirms;
        bool executed;
    }
    Transaction[] transactions;

    modifier onlyOwner() {
        require(isOwner[msg.sender], 'not owner');
        _;
    }
    modifier txExist(uint256 txId) {
        require(txId < transactions.length, 'Tx does not exist');
        _;
    }
    modifier notConfirm(uint256 txId) {
        require(!isConfirm[txId][msg.sender], 'Tx is confirmed');
        _;
    }
    modifier notExcuted(uint256 txId) {
        Transaction storage transaction = transactions[txId];
        require(!transaction.executed, 'Tx is already executed');
        _;
    }

    function submitTransaction(address to, bytes memory data)
        public 
        onlyOwner {
            uint256 txId = transactions.length;
            Transaction memory transaction = Transaction({
                to: to,
                data: data,
                confirms: 0,
                executed: false
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

    function revertTransaction(uint256 txId)
    public 
    onlyOwner
    txExist(txId)
    notExcuted(txId) {
        require(isConfirm[txId][msg.sender], 'not confirm');
        transactions[txId].confirms -= 1;
        isConfirm[txId][msg.sender] = false;

        emit RevokeTx(msg.sender, txId);
    }

    function executeTransaction(uint256 txId)
        public
        onlyOwner
        txExist(txId)
        notExcuted(txId) {
            Transaction storage transaction = transactions[txId];
            require(transaction.confirms >= numConfirm, 'not enough confirms');
            transaction.executed = true;
            (bool success, ) = transaction.to.call(transaction.data);
            require(success, 'Failed to call dummy');

            emit ExecuteTx(msg.sender, txId);
    }

    function getOwners() public view returns(address[] memory) {
        return owners;
    }

    receive() external payable {}
    fallback() external payable {}
}