package com.example.springjsp2.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
@EqualsAndHashCode
public class Book {
    private String isbn;
    private String name;
    private String author;

    public Book() {

    }
}
