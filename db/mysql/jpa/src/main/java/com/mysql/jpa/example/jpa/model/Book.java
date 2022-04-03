package com.mysql.jpa.example.jpa.model;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;

@Entity
@ToString(includeFieldNames = true)
@EqualsAndHashCode
public class Book {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Author author;

    @Column(unique=true)
    private String title;

    protected Book() {}

    public Book(String title){
        this.title = title;
    }

    public String getTitle(){
        return this.title;
    }

    public void setAuthor(Author author){
        this.author = author;
    }

    public Author getAuthor(){
        return this.author;
    }

}