package com.demo.basic;

import lombok.Data;

@Data
public class Person {
    private String name;
    private int salary;
    private int age;
    private String sex;
    private String area;

    Person(String name, int salary, int age, String sex, String area) {
        this.name = name;
        this.salary = salary;
        this.age = age;
        this.sex = sex;
        this.area = area;
    }
}
