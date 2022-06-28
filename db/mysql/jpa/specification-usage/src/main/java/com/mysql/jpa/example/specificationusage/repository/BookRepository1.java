package com.mysql.jpa.example.specificationusage.repository;

import com.mysql.jpa.example.specificationusage.dao.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface BookRepository1 extends JpaRepository<Book, Long>, JpaSpecificationExecutor<Book> {
}
