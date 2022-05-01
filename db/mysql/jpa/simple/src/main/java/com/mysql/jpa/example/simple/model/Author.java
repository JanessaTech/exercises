package com.mysql.jpa.example.simple.model;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.util.Set;

@Entity
@ToString(includeFieldNames = true)
@EqualsAndHashCode
public class Author {
    @Id
    @GeneratedValue
    private Long id;

    private String firstName;

    @Column(unique=true)
    private String lastName;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "author")
    private Set<Book> books;

    protected Author() {}

    public Author(String first, String last) {
        this.firstName = first;
        this.lastName  = last;
    }

    public Set<Book> getBooks(){
        return this.books;
    }

    public String getFullName(){
        return this.firstName + " " + this.lastName;
    }
}
