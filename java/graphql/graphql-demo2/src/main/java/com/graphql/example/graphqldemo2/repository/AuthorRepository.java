package com.graphql.example.graphqldemo2.repository;

import com.graphql.example.graphqldemo2.dao.Author;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Repository
public class AuthorRepository {
    private List<Author> authors = new ArrayList<>();

    public List<Author> findAll(){
        return authors;
    }

    public Author findById(Integer id) throws Exception {
        return authors.stream().filter(it -> it.id() == id).findFirst().orElseThrow(() -> new Exception("Author with id " + id + " cannot be found"));
    }

    public Author findByName(String name) throws Exception {
        return authors.stream().filter(it -> it.fullName().equals(name)).findFirst().orElseThrow(() -> new Exception("Author with fullName " + name + " cannot be found"));
    }

    @PostConstruct
    private void init() {
        authors.add(new Author(1,"Josh","Long"));
        authors.add(new Author(2,"Mark","Heckler"));
        authors.add(new Author(3,"Greg","Turnquist"));
    }
}
