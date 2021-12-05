package com.example.webmvctestdemo;

import org.springframework.stereotype.Service;

@Service
public class GreetingService {
    public String greeting(){
        return "hello world";
    }
}
