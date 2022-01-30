package com.example.transaction.xml.data;

import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "employee")
@ToString(includeFieldNames = true)
@EqualsAndHashCode
public class Employee implements Serializable {
    private static final long serialVersionUID = 1L;

    public Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    Long id;

    @Column(name = "name")
    String name;

    @Column(name = "age")
    Integer age;

    public Employee() {

    }
}
