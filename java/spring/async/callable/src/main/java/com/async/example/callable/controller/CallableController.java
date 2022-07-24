package com.async.example.callable.controller;

import com.async.example.callable.service.MyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.Callable;

@RestController
@Slf4j
public class CallableController {

    @Autowired
    MyService myService;

    @GetMapping("/hello")
    public Callable<String> sayHello() {
        log.info("Thead {} is running in CallableController.sayHello", Thread.currentThread().getName());
        Callable<String> callable = new Callable<String>() {
            @Override
            public String call() throws Exception {
                log.info("Thread {} is running in call method", Thread.currentThread().getName());
                String msg = myService.sayHello();
                log.info("Thread {} is finished in call method", Thread.currentThread().getName());
                return msg;
            }
        };

        log.info("Thread {} quits from CallableController.sayHello", Thread.currentThread().getName());
        return callable;
    }

}
