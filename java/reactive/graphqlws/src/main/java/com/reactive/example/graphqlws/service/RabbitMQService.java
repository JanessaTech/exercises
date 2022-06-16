package com.reactive.example.graphqlws.service;

import com.entities.Student;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
public class RabbitMQService {
    private static final ObjectMapper mapper = new ObjectMapper();
    private Sinks.Many<Student> sink = Sinks.many().multicast().directBestEffort();
    private Flux<Student> publisher = sink.asFlux();

    public Flux<Student> getStudent() {
        return publisher;
    }

    @RabbitListener(bindings = {
            @QueueBinding(
                    value = @Queue("${custom.rabbitmq.queue}"),
                    exchange = @Exchange(value = "${custom.rabbitmq.exchange}", durable = "true"),
                    key = {"${custom.rabbitmq.routingkey}"})
    })
    public void listen(String stuJson) throws JsonProcessingException {
        Student student = mapper.readValue(stuJson, Student.class);
        System.out.println("Received Message From RabbitMQ: " + student);
        sink.tryEmitNext(student);
    }
}
