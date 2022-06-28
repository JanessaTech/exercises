package com.mysql.jpa.example.specificationusage.service;

import com.mysql.jpa.example.specificationusage.dao.Book;

import java.util.List;

public interface BookService {
    List<Book> findBooksByAuthorNameAndTitle(String title, String author);
}
