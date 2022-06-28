package com.mysql.jpa.example.specificationusage.service;

import com.mysql.jpa.example.specificationusage.dao.Book;
import com.mysql.jpa.example.specificationusage.repository.BookRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service(value = "bookServiceImpl")
public class BookServiceImpl implements BookService{
    @Resource
    private BookRepository bookRepository;

    @Override
    public List<Book> findBooksByAuthorNameAndTitle(String author, String title) {
        List<Book> books = bookRepository.findBooksByAuthorNameAndTitle(author, title);
        return books;
    }
}
