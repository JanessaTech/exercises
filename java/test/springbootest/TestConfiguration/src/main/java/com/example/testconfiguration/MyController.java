package com.example.testconfiguration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
    @Autowired
    private GreetingService greetingService;

    @GetMapping(value = "/hi")
    public String greet(){
        return greetingService.greet();
    }
}
