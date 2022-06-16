package com.reactive.example.graphqlws.controller;


import com.entities.Student;
import com.reactive.example.graphqlws.service.RabbitMQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;


@Controller
public class MyController {

    @Autowired
    private RabbitMQService rabbitMQService;

    @QueryMapping
    public String greeting() {
        return "Hello world!";
    }

    @SubscriptionMapping
    public Flux<Student> getStudent() {
       return rabbitMQService.getStudent();
    }
}
