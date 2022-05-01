package com.mysql.jpa.example.simple.repository;

import com.mysql.jpa.example.simple.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

//@Repository
public interface AuthorRepository  extends JpaRepository<Author, Long> {
}
