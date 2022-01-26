package com.example.springjsp2.service;

import com.example.springjsp2.dao.Book;

import java.util.Collection;

public interface BookService {
    Collection<Book> getBooks();
    Book addBook(Book book);
}
