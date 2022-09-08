package com.example.customfilterinspringsecurity.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/match1")
    public String test1() {
        return "success1";
    }

    @GetMapping("/match2")
    public String test2() {
        return "success2";
    }
}
