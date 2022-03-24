package com.example.initialization;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Slf4j
@Component
public class MyComponent {
    @PostConstruct
    public void start() {
        log.info("calling in start in MyComponent");
    }
}
