package com.example.consumer2.util;

import com.example.consumer2.consumer.AbstractMessageConsumer;
import lombok.extern.slf4j.Slf4j;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.listener.DefaultMessageListenerContainer;
import org.springframework.jms.listener.adapter.MessageListenerAdapter;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ActiveMQHelper {
    @Autowired
    ActiveMQConnectionFactory activeMQConnectionFactory;

    public void startMessageListener(String queue, AbstractMessageConsumer messageConsumer) {
        long x1 = System.currentTimeMillis();
        String consumerName = messageConsumer.getClass().getSimpleName();

        try {
            log.debug("[queue: {}] consumer: {}, starting listener", queue, consumerName);
            ActiveMQQueue activeMQQueue = new ActiveMQQueue(queue);
            MessageListenerAdapter messageListener = new MessageListenerAdapter(messageConsumer);
            messageListener.setDefaultListenerMethod("onMessage");
            DefaultMessageListenerContainer container = new DefaultMessageListenerContainer();
            container.setConcurrentConsumers(messageConsumer.getConsumersCount());
            container.setSessionTransacted(true);
            container.setConnectionFactory(activeMQConnectionFactory);
            container.setDestination(activeMQQueue);
            container.setMessageListener(messageListener);
            container.initialize();
            container.start();
        }catch (Exception e) {
            log.warn("[queue: {}] consumer: {}, error when starting message listener, exception class: {}, exception message: {}", queue, consumerName, e.getCause(), e.getMessage(), e);
        }finally {
            log.debug("[queue: {}] consumer: {}, listener started in {}ms", queue, consumerName, System.currentTimeMillis() - x1);
        }
    }
}
