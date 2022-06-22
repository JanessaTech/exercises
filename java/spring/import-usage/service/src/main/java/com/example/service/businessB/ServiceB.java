package com.example.service.businessB;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@Slf4j
public class ServiceB {

    @PostConstruct
    void init() {
        log.info("==================ServiceB is initiated====================");
    }
}
