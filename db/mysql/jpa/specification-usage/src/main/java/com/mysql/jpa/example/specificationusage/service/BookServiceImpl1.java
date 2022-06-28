package com.mysql.jpa.example.specificationusage.service;

import com.mysql.jpa.example.specificationusage.dao.Book;
import com.mysql.jpa.example.specificationusage.repository.BookRepository1;
import com.mysql.jpa.example.specificationusage.repository.BookSpecs;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service(value = "bookServiceImpl1")
public class BookServiceImpl1 implements BookService{
    @Resource
    private BookRepository1 bookRepository1;

    @Override
    public List<Book> findBooksByAuthorNameAndTitle(String author, String title) {
        List<Book> books = bookRepository1.findAll(BookSpecs.hasAuthor(author).and(BookSpecs.titleContains(title)));
        return books;
    }
}
