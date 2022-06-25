package com.graphql.example.graphqldemo2.repository;

import com.graphql.example.graphqldemo2.dao.Book;
import com.graphql.example.graphqldemo2.dao.Rating;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Repository
public class BookRepository {
    private final AuthorRepository authorRepository;

    private List<Book> books = new ArrayList<>();

    public BookRepository(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Book> findAll() {
        return books;
    }

    public Book findOne(Integer id) {
        return books.stream()
                .filter(book -> book.id() == id)
                .findFirst().orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @PostConstruct
    private void init() throws Exception {
        books.add(new Book(1,
                "Reactive Spring",
                484,
                Rating.FIVE,
                authorRepository.findByName("Josh Long")));
        books.add(new Book(2,
                "Spring Boot Up & Running",
                328,
                Rating.FIVE,
                authorRepository.findByName("Mark Heckler")));
        books.add(new Book(3,
                "Hacking with Spring Boot 2.3",
                392,
                Rating.FIVE,
                authorRepository.findByName("Greg Turnquist")));
    }
}
