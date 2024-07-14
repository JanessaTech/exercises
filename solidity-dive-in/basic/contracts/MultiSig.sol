// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Core {
    uint256 acc;
    event Log(address sender, uint256 acc, uint256 j);

    function callme(uint256 j) public {
        acc += j;
        emit Log(msg.sender, acc, j);
    }
}

contract MultiSigWallet {
    event submitTransactionLog(address indexed sender, uint256 indexed txId, address indexed to, bytes data);
    event confirmTransactionLog(address indexed sender, uint256 indexed txId);
    event revokeTransactionLog(address indexed sender, uint256 indexed txId);
    event executeTransactionLog(address indexed sender, uint256 indexed txId);

    struct Transaction {
        address to;
        bytes data;
        bool executed;
        uint256 confirmed;
    }

    Transaction[] transactions;
    mapping(address => bool) isOwner;
    mapping (uint256 => mapping(address => bool)) public isConfirmed;
    uint numConfirmRequired;

    modifier onlyOwner() {
        require(isOwner[msg.sender], 'Only owner can do the operation');
        _;
    }

    modifier checkTxIndex(uint256 txId) {
        require(transactions.length > txId, 'The txId is invalid');
        _;
    }

    modifier notConfirmed(uint256 txId) {
        require(!isConfirmed[txId][msg.sender], 'The txId is already confirmed by the sender');
        _;
    }

    modifier notExecuted(uint256 txId) {
        require(!transactions[txId].executed, 'tx is alreay executed');
        _;
    }

    constructor(address[] memory _owners, uint256 _numConfirmRequired) {
        require(_owners.length >= _numConfirmRequired, '_numConfirmRequired must be less than the number of _owners');
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), 'Invalid owner');
            require(!isOwner[owner], 'Duplicated owner');

            isOwner[owner] = true;
        }
        numConfirmRequired = _numConfirmRequired;
    }

    function submitTransaction(address _to, bytes memory _data) public {
        uint256 idx = transactions.length;
        transactions.push(Transaction({
            to: _to,
            data: _data,
            executed: false,
            confirmed: 0
        }));
        emit submitTransactionLog(msg.sender, idx, _to, _data);
    }

    function confirmTransaction(uint256 txId) 
        public 
        onlyOwner 
        checkTxIndex(txId)
        notConfirmed(txId)
        notExecuted(txId)
        {
        Transaction storage transaction = transactions[txId];
        transaction.confirmed += 1;
        isConfirmed[txId][msg.sender] = true;
        emit confirmTransactionLog(msg.sender, txId);
    }

    function revokeTransaction(uint256 txId) public
        onlyOwner 
        checkTxIndex(txId)
        notConfirmed(txId)
        notExecuted(txId)
     {
        Transaction storage transaction = transactions[txId];
        require(isConfirmed[txId][msg.sender], 'The txId must be confirmed before by the sender');
        transaction.confirmed -= 1;
        isConfirmed[txId][msg.sender] = false;
        emit revokeTransactionLog(msg.sender, txId);
    }

    function executeTransaction(uint256 txId) public
        onlyOwner 
        checkTxIndex(txId)
        notExecuted(txId)
     {
        Transaction storage transaction = transactions[txId];
        require(transaction.confirmed >= numConfirmRequired, 'The number of conformation is not reached');
        (bool success, ) = transaction.to.call(transaction.data);
        require(success, 'Failed to execute the transaction');
        transaction.executed = true;
        emit executeTransactionLog(msg.sender, txId);
    }

    function execute(address to, bytes calldata data) public {
        (bool success, ) = to.call(data);
        require(success, 'Failed to execute transaction');
    }

    function getData(uint256 j) public pure returns(bytes memory) {
        return abi.encodeWithSignature("callme(uint256)", j);
    }
}