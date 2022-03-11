package com.example.producer.controller;

import com.example.common.pojo.Employee;
import com.example.producer.service.RabbitMQSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SenderController {
    @Autowired
    private RabbitMQSenderService rabbitMQSenderService;

    @PostMapping(value = "send")
    String send(@RequestBody Employee employee) {
        rabbitMQSenderService.send(employee);
        return "success";
    }
}
