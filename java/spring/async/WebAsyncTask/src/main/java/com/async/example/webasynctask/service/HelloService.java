package com.async.example.webasynctask.service;

import org.springframework.stereotype.Service;

@Service
public class HelloService {
    public String sayHello() {
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Hello world!";
    }
}
