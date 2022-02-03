package com.example.example1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.jms.core.JmsTemplate;

@SpringBootApplication
public class Example1Application {

    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Example1Application.class, args);
        JmsTemplate jms = ctx.getBean(JmsTemplate.class);
        jms.convertAndSend("javainuse", "test message");
    }

}
