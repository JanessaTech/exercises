package com.example.webmvctestdemo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller1 {

    @Autowired
    private GreetingService greetingService;

    @GetMapping(value = "/test1")
    public String get(){
        return greetingService.greeting();
    }
}
