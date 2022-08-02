package com.idempotent.example.idempotent.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicInteger;

public interface MyBusiness {
    void demoMethod();
}

@Service
@Slf4j
class MyBusinessImpl implements MyBusiness {

    private AtomicInteger cnt = new AtomicInteger(0);

    @Override
    public void demoMethod() {
        int c  = cnt.getAndIncrement();
        log.info("Execute demoMethod {}", c);
    }
}
