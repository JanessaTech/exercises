package com.example.springdataredis.service;

import com.example.springdataredis.model.Student;
import com.example.springdataredis.repository.StudentRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{
    @Resource
    private StudentRepository repository;

    @Override
    public List<Student> getAll() {
        List<Student> students = new ArrayList<>();
        repository.findAll().forEach(students::add);
        return students;
    }

    @Override
    public Student getById(String id) {
        return repository.findById(id).get();
    }

    @Override
    public void create(Student student) {
        repository.save(student);
    }

    @Override
    public void update(Student student) {
        repository.save(student);
    }

    @Override
    public void deleteById(String id) {
        repository.deleteById(id);
    }
}
