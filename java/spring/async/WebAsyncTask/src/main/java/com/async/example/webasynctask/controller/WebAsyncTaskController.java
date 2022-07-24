package com.async.example.webasynctask.controller;

import com.async.example.webasynctask.service.HelloService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.WebAsyncTask;

import java.util.concurrent.Callable;
import java.util.concurrent.TimeoutException;

@RestController
@Slf4j
public class WebAsyncTaskController {
    @Autowired
    HelloService helloService;

    @GetMapping("/hello")
    public WebAsyncTask<String> sayHello() {
        log.info("Thread {} starts executing WebAsyncTaskController.sayHello", Thread.currentThread().getName());
        WebAsyncTask<String> webAsyncTask = new WebAsyncTask<>(6000, new Callable<String>() {
            @Override
            public String call() throws Exception {
                log.info("Thread {} is running in webAsyncTask.call()", Thread.currentThread().getName());
                String msg = helloService.sayHello();
                log.info("Thread {} is finished in webAsyncTask.call()", Thread.currentThread().getName());
                return msg;
            }
        });
        webAsyncTask.onCompletion(new Runnable() {
            @Override
            public void run() {
                log.info("Thread {} is finished with the execution of webAsyncTask", Thread.currentThread().getName());
            }
        });
        webAsyncTask.onTimeout(new Callable<String>() {
            @Override
            public String call() throws Exception {
                log.info("Thread {} is timeout with the execution of webAsyncTask", Thread.currentThread().getName());
                throw new TimeoutException("timeout");
            }
        });
        log.info("Thread {} is finihsed with executing WebAsyncTaskController.sayHello", Thread.currentThread().getName());
        return webAsyncTask;
    }
}
