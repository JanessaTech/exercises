package com.mysql.jpa.example.transaction.dao;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "TABLE1")
@Data
public class Table1 implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TABLE_ID")
    Long id;

    @Column(name = "NAME")
    String name;
}
