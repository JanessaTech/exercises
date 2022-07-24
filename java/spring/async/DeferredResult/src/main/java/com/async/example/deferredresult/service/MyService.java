package com.async.example.deferredresult.service;

import org.springframework.stereotype.Service;

@Service
public class MyService {
    public String sayHello() {
        try {
            Thread.sleep(3000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Hello world";
    }
}
