package com.example.useconfigbeanxmlfileofanotherproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;

@ImportResource("classpath:reference-beans.xml")
public class UseConfigbeanXmlFileOfAnotherProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(UseConfigbeanXmlFileOfAnotherProjectApplication.class, args);
    }
}
