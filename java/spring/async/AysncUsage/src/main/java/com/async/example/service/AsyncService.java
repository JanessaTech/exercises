package com.async.example.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.Future;

@Service
@Slf4j
public class AsyncService {

    @Async
    public void asyncMethodWithVoidReturnType() {
        log.info("Thread {} executing asyncMethodWithVoidReturnType", Thread.currentThread().getName());
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("Thread {} finished asyncMethodWithVoidReturnType", Thread.currentThread().getName());
    }

    @Async
    public Future<String> asyncMethodWithReturnType() {
        log.info("Thread {} executing asyncMethodWithReturnType", Thread.currentThread().getName());
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("Thread {} finished asyncMethodWithReturnType", Thread.currentThread().getName());

        return new AsyncResult<String>("hello world !!!!");
    }

}
