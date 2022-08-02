package com.autorunning.example.autorunning.components;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
@Slf4j
public class DemoPostConstruct {
    static {
        log.info("===========static=============");
    }
    public DemoPostConstruct() {
        log.info("=============DemoPostConstruct=============");
    }

    @PostConstruct
    public void init() {
        log.info("============@PostConstruct===========");
    }
}
