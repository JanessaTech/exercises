package com.example.springdataredis.controller;


import com.example.springdataredis.model.Student;
import com.example.springdataredis.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/demo")
public class StudentController{
    @Autowired
    private StudentService service;

    @GetMapping
    List<Student> getAll() {
        return service.getAll();
    }

    @GetMapping(value = "/{id}")
    Student getById(@PathVariable(name = "id", required = true) String id) {
        return service.getById(id);
    }

    @PostMapping
    void save(@RequestBody Student student) {
        service.create(student);
    }

    @DeleteMapping(value = "/{id}")
    void delete(@PathVariable(name = "id", required = true) String id) {
        service.deleteById(id);
    }
}
