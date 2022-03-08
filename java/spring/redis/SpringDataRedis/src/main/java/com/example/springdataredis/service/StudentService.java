package com.example.springdataredis.service;

import com.example.springdataredis.model.Student;

import java.util.List;

public interface StudentService {
    List<Student> getAll();
    Student getById(String id);
    void create(Student student);
    void update(Student student);
    void deleteById(String id);
}
