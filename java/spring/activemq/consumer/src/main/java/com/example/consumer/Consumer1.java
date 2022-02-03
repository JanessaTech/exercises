package com.example.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

//@Component
public class Consumer1 {
    private static final Logger logger = LoggerFactory.getLogger(Consumer1.class);

    @JmsListener(destination = "demo-queue")
    public void consumeMessage(String message) {
        logger.info("Message received from activemq queue---"+message);
    }
}
