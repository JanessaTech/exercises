package com.example.injection;

import org.springframework.stereotype.Service;

@Service
public class MyServiceB implements MyService{
    @Override
    public String getName() {
        return "service B";
    }
}
