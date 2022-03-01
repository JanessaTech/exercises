package com.example.consumer2;

import com.example.consumer2.starter.MyBusinessMessageConsumer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class Consumer2Application {

    public static void main(String[] args) {

        ConfigurableApplicationContext ctx = SpringApplication.run(Consumer2Application.class, args);
        MyBusinessMessageConsumer starter = ctx.getBean(MyBusinessMessageConsumer.class);
        starter.start();
    }

}
