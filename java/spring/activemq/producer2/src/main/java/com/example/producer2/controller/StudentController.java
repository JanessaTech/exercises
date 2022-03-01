package com.example.producer2.controller;

import com.example.common.model.Student;
import com.example.producer2.config.StudentMessageProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/students")
public class StudentController {

    @Autowired
    private StudentMessageProducer studentMessageProducer;

    @PostMapping
    public void send(@RequestBody Student student) {
        studentMessageProducer.sendMessage(student);
    }
}
