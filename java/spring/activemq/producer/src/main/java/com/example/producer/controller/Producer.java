package com.example.producer.controller;

import com.example.common.model.Student;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.jms.Queue;

@RestController("/producer")
public class Producer {
    @Autowired
    private JmsTemplate jmsTemplate;

    @Autowired
    private Queue queue;

    @PostMapping("/message")
    public Student sendMessage(@RequestBody Student student) {

        ObjectMapper mapper = new ObjectMapper();
        try {
            String studentAsJson = mapper.writeValueAsString(student);
            jmsTemplate.convertAndSend(queue, studentAsJson);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return student;
    }
}
