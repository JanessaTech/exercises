package com.example.consumer.service;

import com.example.common.pojo.Employee;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
class RabbitMQSenderService {
    private static final ObjectMapper mapper = new ObjectMapper();
    // exchange and queue will be created automatically once we start application
    @RabbitListener(bindings = {
            @QueueBinding(
                    value = @Queue("${javainuse.rabbitmq.queue}"),
                    exchange = @Exchange(value = "${javainuse.rabbitmq.exchange}", durable = "true"),
                    key = {"${javainuse.rabbitmq.routingkey}"})
    })
    public void recievedMessage(String employee) throws JsonProcessingException {
        Employee emp = mapper.readValue(employee, Employee.class);
        System.out.println("Recieved Message From RabbitMQ: " + emp);
    }
}