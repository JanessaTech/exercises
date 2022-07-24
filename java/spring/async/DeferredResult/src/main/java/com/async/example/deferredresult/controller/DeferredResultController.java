package com.async.example.deferredresult.controller;

import com.async.example.deferredresult.service.MyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import java.util.concurrent.ForkJoinPool;

@RestController
@Slf4j
public class DeferredResultController {
    @Autowired
    MyService myService;

    @GetMapping("/hello")
   public DeferredResult<String> sayHello() {
       log.info("Thread {} is running in DeferredResultController.sayHello()", Thread.currentThread().getName());
        DeferredResult<String> deferredResult = new DeferredResult<>(5000L);
        ForkJoinPool.commonPool().submit(() -> {
            log.info("Processing in separate thread: {}", Thread.currentThread().getName());
            String msg = myService.sayHello();
            deferredResult.setResult(msg);
            log.info("Finished process in separate thread: {}", Thread.currentThread().getName());
        });
        deferredResult.onCompletion(new Runnable() {
            @Override
            public void run() {
                log.info("Processing deferredResult.onCompletion in separate thread: {}", Thread.currentThread().getName());
            }
        });
        deferredResult.onTimeout(() -> deferredResult.setErrorResult("timeout error"));

       log.info("Thread {} is finished in DeferredResultController.sayHello()", Thread.currentThread().getName());
       return deferredResult;
   }
}
