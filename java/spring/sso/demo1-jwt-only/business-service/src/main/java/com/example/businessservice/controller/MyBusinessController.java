package com.example.businessservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/business")
public class MyBusinessController {

    @GetMapping("/test1")
    public String userOnly() {
        return "test1 is accessed by ROLE_USER";
    }

    @GetMapping("/test2")
    public String adminOnly() {
        return "test2 is accessed by ROLE_ADMIN";
    }

    @GetMapping("/test3")
    public String admin_or_user() {
        return "test3 is accessed by ROLE_ADMIN";
    }
}
