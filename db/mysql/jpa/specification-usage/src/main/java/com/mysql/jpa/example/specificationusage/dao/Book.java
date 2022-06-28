package com.mysql.jpa.example.specificationusage.dao;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "BOOK")
@Data
public class Book implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOK_ID")
    Long id;

    @Column(name = "TITLE")
    String title;

    @Column(name = "AUTHOR")
    String author;

}
