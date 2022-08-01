package com.asyn.threadpool.example.asynthreadpool.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@Configuration
public class ExecutorConfig {
    @Value("${threadNamePrefix}")
    String threadNamePrefix;

    @Value("${corePoolSize}")
    int corePoolSize;

    @Value("${maximumPoolSize}")
    int maximumPoolSize;

    @Value("${keepAliveTime}")
    long keepAliveTime;



    @Bean
    ThreadFactory threadFactoryBuilder() {
        return new ThreadFactory() {
            private final AtomicInteger index = new AtomicInteger(0);

            @Override
            public Thread newThread(Runnable r) {
                Thread t = new Thread(r);
                t.setName(threadNamePrefix + "_" + index.getAndIncrement());
                return t;
            }
        };
    }

    @Bean
    Executor customExecutor() {
        ExecutorService threadPool =  new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime,
                TimeUnit.MILLISECONDS, new LinkedBlockingQueue<>(1024), threadFactoryBuilder(), new ThreadPoolExecutor.AbortPolicy());
        return threadPool;

    }
}
