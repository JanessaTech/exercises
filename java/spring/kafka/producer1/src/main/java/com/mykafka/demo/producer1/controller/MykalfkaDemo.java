package com.mykafka.demo.producer1.controller;

import com.mykafka.demo.producer1.service.Producer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/kafka")
public class MykalfkaDemo {
    @Autowired
    private Producer producer;

    @PostMapping(value = "/publish")
    public String send(@RequestParam("message") String message) {
        producer.sendMessage(message);
        return "success";
    }
}
