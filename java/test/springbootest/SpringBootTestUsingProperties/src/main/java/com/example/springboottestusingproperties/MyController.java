package com.example.springboottestusingproperties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @Value("${name}")
    private String name;
    @GetMapping(value = "/name")
    public String getName(){
        return name;
    }
}
