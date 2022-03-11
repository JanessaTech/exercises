package com.example.cachemanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CachemanagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(CachemanagerApplication.class, args);
    }

}
