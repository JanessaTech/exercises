package com.mysql.jpa.example.jpa;

import com.mysql.jpa.example.jpa.model.Author;
import com.mysql.jpa.example.jpa.model.Book;
import com.mysql.jpa.example.jpa.repository.AuthorRepository;
import com.mysql.jpa.example.jpa.repository.BookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class JpaApplication {
    private static final Logger log =
            LoggerFactory.getLogger(JpaApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(JpaApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(BookRepository bookRepo, AuthorRepository authRepo) {
        return (args) -> {
            //create a new author
            Author author = new Author("JK", "Rowling");
            //create a new book
            Book book = new Book("Harry Potter");
            //save author to db
            authRepo.save(author);
            //associate author with book
            book.setAuthor(author);
            //save book
            bookRepo.save(book);
            //read book from db with custom findByTitle
            Book savedBook = bookRepo.findByTitle("Harry Potter");
            //print title
            log.info(savedBook.getTitle());
            //print book author's full name
            log.info(savedBook.getAuthor().getFullName());
        };
    }

}
