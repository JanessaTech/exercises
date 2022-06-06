package com.springcloud.feign.example.feignclient.controller;

import com.springcloud.feign.example.feignclient.client.MyBusinessClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/feign")
public class MyFeignController {
    @Autowired
    private MyBusinessClient client;

    @GetMapping(value = "/hello")
    String sayHello() {
        return client.helloworld();
    }

    @GetMapping(value = "/timeout")
    String SayTimeout() {
        return client.timeout();
    }
}
