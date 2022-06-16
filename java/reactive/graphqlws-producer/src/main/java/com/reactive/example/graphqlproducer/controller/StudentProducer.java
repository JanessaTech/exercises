package com.reactive.example.graphqlproducer.controller;

import com.entities.Student;
import com.reactive.example.graphqlproducer.service.RabbitMQSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentProducer {
    @Autowired
    private RabbitMQSenderService rabbitMQSenderService;

    @PostMapping(value = "send")
    public String send(@RequestBody Student student) {
        rabbitMQSenderService.send(student);
        return "success";
    }
}
