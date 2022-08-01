package com.asyn.threadpool.example.asynthreadpool.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CountDownLatch;

public interface AsynService {
    void executeAsync(CountDownLatch latch);
}

@Service
@Slf4j
class AsynServiceImpl implements AsynService {

    @Async("customExecutor")
    @Override
    public void executeAsync(CountDownLatch latch) {
        log.info("Thread {} is running in AsynServiceImpl.executeAsync", Thread.currentThread().getName());
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            latch.countDown();
            log.info("Thread {} is to countDown", Thread.currentThread().getName());
        }
    }
}

