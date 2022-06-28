package com.mysql.jpa.example.specificationusage.repository;

import com.mysql.jpa.example.specificationusage.dao.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long>, BookRepositoryCustom{
}
