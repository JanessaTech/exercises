package com.mysql.jpa.example.manytomany.service;

import com.mysql.jpa.example.manytomany.dao.Student;

import java.util.List;

public interface StudentService {
    Student create(Student student);
    Student assignTo(Long studentId, Long courseId) throws Exception;
    List<Student> getAll();
    void delete(Long id);
}
