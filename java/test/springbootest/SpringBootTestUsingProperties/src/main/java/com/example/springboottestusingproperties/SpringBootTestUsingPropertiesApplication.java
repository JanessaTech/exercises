package com.example.springboottestusingproperties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootTestUsingPropertiesApplication {
    @Value("${name}")
    String name;

    public static void main(String[] args) {
        SpringApplication.run(SpringBootTestUsingPropertiesApplication.class, args);
    }

}
