package com.demo.security.login.session.singleloginsession.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BusinessController {

    @GetMapping(value = "/business")
    public String doBusiness() {
        return "access business successful";
    }
}
