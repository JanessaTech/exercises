package com.example.springjsp2.service;

import com.example.springjsp2.dao.Book;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class BookServiceImp implements BookService{
    private List<Book> books = new ArrayList<>();
    @Override
    public Collection<Book> getBooks() {
        return this.books;
    }

    @Override
    public Book addBook(Book book) {
        this.books.add(book);
        return book;
    }
}
