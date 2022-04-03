package com.mysql.jpa.example.jpa.repository;

import com.mysql.jpa.example.jpa.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface AuthorRepository  extends JpaRepository<Author, Long> {
}
