package com.example.service.businessA;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@Slf4j
public class ServiceA {

    @PostConstruct
    void init() {
        log.info("==================ServiceA is initiated====================");
    }
}
