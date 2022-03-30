package com.example.customfilterinspringsecurity.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/match1")
    public String test() {
        return "success";
    }
}
