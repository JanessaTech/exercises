package com.springcloud.feign.example.mybusiness.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/business")
public class MyBusinessController {
    @GetMapping(value = "/hello")
    String helloworld() {
        return "hello world";
    }

    @GetMapping(value = "/timeout")
    String timeout() {
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "hello world, no read timeout";
    }
}
