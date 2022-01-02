package com.example.injection;

import org.springframework.stereotype.Service;

@Service
public class MyServiceA implements MyService{
    @Override
    public String getName() {
        return "service A";
    }
}
