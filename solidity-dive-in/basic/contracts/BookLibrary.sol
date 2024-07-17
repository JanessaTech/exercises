// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract BookLibrary {
    event Put(address indexed owner, string bookName);
    event Borrow(address indexed from, string bookName);
    event Return(address indexed from, string bookName);
    struct Book {
        string name;
        address borrowBy;
    }

    Book[] books;
    mapping(string => Book) bookByName;
    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier isOwner() {
        require(msg.sender == owner, 'You must be owner');
        _;
    }

    modifier isBookNameEmpty(string memory bookName) {
        require(bytes(bookName).length > 0, 'BookName is empty');
        _;
    }

    function put(string memory bookName) public 
        isOwner
        isBookNameEmpty(bookName) {
        Book storage book = bookByName[bookName];
        bool exist = checkBookExist(book);
        require(!exist, 'The book is already put');
        Book memory newBook = Book({name: bookName, borrowBy: address(0)});
        books.push(newBook);
        bookByName[bookName] = newBook;

        emit Put(msg.sender, bookName);
    }

    function removeByBookName(string memory bookName) public 
        isOwner 
        isBookNameEmpty(bookName) {
        Book storage book = bookByName[bookName];
        bool exist = checkBookExist(book);
        require(exist, 'book does not exist');
        delete bookByName[bookName];
    }

    function checkBookExist(Book storage book) view private returns(bool) {
        if (bytes(book.name).length > 0) return true;
        return false;
    }

    function getBookByName(string memory bookName) 
        public isBookNameEmpty(bookName) 
        view returns(string memory, address) {
            Book storage book = bookByName[bookName];
            return (book.name, book.borrowBy);
    }

    function borrow(string memory bookName) public
        isBookNameEmpty(bookName) {
            Book storage book = bookByName[bookName];
            bool exist = checkBookExist(book);
            require(exist, 'book does not exist');
            book.borrowBy = msg.sender;
            emit Borrow(msg.sender, bookName);
    }

    function returnBook(string memory bookName) public 
        isBookNameEmpty(bookName) {
            Book storage book = bookByName[bookName];
            bool exist = checkBookExist(book);
            require(exist, 'book does not exist');
            require(book.borrowBy == msg.sender, 'Invalid user to return book');
            book.borrowBy = address(0);
            emit Return(msg.sender, bookName);
        }
}