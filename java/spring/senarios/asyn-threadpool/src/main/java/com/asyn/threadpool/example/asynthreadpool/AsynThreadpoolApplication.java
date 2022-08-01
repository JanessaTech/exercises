package com.asyn.threadpool.example.asynthreadpool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class AsynThreadpoolApplication {

    public static void main(String[] args) {
        SpringApplication.run(AsynThreadpoolApplication.class, args);
    }

}
