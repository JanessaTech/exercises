package com.mysql.jpa.example.specificationusage.repository;

import com.mysql.jpa.example.specificationusage.dao.Book;

import java.util.List;

public interface BookRepositoryCustom {
    List<Book> findBooksByAuthorNameAndTitle(String authorName, String title);
}
