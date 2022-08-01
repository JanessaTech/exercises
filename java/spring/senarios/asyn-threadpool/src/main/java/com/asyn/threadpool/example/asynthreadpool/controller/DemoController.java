package com.asyn.threadpool.example.asynthreadpool.controller;

import com.asyn.threadpool.example.asynthreadpool.service.AsynService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.concurrent.CountDownLatch;

@RestController
@Slf4j
@Validated
public class DemoController {
    @Autowired
    AsynService asynService;

    @PostMapping("/demo/{count}")
    public void demo(@PathVariable(value = "count", required = true) @Min(1) @Max(10) int count) {
        log.info("Demo starts in thread {}", Thread.currentThread().getName());
        CountDownLatch latch = new CountDownLatch(count);
        for(int i = 0; i < count; i++) {
            asynService.executeAsync(latch);
        }
        try {
            latch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("Demo ends in thread {}", Thread.currentThread().getName());

    }
}
