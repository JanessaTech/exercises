package com.example.injection;

import org.springframework.stereotype.Service;

@Service
public class MyServiceC implements MyService{
    @Override
    public String getName() {
        return "service C";
    }
}
