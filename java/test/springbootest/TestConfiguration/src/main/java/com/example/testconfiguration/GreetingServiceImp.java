package com.example.testconfiguration;

import org.springframework.stereotype.Service;

@Service
public class GreetingServiceImp implements GreetingService{
    @Override
    public String greet() {
        return "Hello Jane";
    }
}
