package com.mysql.jpa.example.specificationusage.repository;

import com.mysql.jpa.example.specificationusage.dao.Book;
import org.springframework.data.jpa.domain.Specification;

public class BookSpecs {
    public static Specification<Book> hasAuthor(String author) {
        return (book, cq, cb) -> cb.equal(book.get("author"), author);
    }

    public static Specification<Book> titleContains(String title) {
        return (book, cq, cb) -> cb.like(book.get("title"), "%" + title + "%");
    }
}
