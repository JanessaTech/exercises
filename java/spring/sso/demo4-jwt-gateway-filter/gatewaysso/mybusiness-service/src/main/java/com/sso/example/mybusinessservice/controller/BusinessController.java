package com.sso.example.mybusinessservice.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/business")
@Slf4j
public class BusinessController {

    @GetMapping("/hello")
    public String hello(@RequestParam(name = "msg", required = true) String message,
                        @RequestHeader(name = "username", required = true) String userName) {
        log.info("User {} is saying {}", userName, message);
        return "ok";
    }

    @GetMapping("/demo")
    public String demo(@RequestParam(name = "msg", required = true) String message) {
        log.info("msg {}", message);
        return "ok";
    }
}
