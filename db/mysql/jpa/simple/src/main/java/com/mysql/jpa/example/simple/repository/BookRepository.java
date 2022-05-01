package com.mysql.jpa.example.simple.repository;

import com.mysql.jpa.example.simple.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

//@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByTitle(String title);
}
