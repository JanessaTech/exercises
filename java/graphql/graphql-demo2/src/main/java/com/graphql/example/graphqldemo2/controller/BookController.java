package com.graphql.example.graphqldemo2.controller;

import com.graphql.example.graphqldemo2.dao.Book;
import com.graphql.example.graphqldemo2.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class BookController {
   @Autowired BookRepository bookRepository;

    //@QueryMapping(value = "allBooks")
    @SchemaMapping(typeName = "Query",value = "allBooks")
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @SchemaMapping(typeName = "Query", value="findOne")
    public Book findOne(@Argument Integer id) {
        return bookRepository.findOne(id);
    }


}
