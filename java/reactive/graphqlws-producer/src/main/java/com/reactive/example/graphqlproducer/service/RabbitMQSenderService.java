package com.reactive.example.graphqlproducer.service;

import com.entities.Student;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RabbitMQSenderService {
    @Autowired
    private AmqpTemplate rabbitTemplate;

    @Value("${custom.rabbitmq.exchange}")
    private String exchangeName;

    @Value("${custom.rabbitmq.routingkey}")
    private String routingkey;

    public void send(Student student) {
        rabbitTemplate.convertAndSend(exchangeName, routingkey, student);
        log.info("Successfully sent student : {}", student);
    }

}