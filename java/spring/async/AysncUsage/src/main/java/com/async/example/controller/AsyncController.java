package com.async.example.controller;

import com.async.example.service.AsyncService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.Future;

@RestController
public class AsyncController {
    @Autowired
    AsyncService asyncService;

    @GetMapping(value = "/test/void")
    public void testVoidMethod() {
        asyncService.asyncMethodWithVoidReturnType();
    }

    @GetMapping(value = "/test/nonvoid")
    public Future<String> testNonVoidMethod() {
        return asyncService.asyncMethodWithReturnType();
    }
}
