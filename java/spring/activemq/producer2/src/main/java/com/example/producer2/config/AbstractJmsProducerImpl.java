package com.example.producer2.config;

import com.example.common.model.MyBusinessMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessagePostProcessor;

@Slf4j
abstract class AbstractJmsProducerImpl {
    @Autowired
    private JmsTemplate jmsTemplate;

    void send(final MyBusinessMessage message) {
        String destination = getQueueName();
        if (message.getDelay() > 0) {
            log.debug("[destination: {}] [delay: {}] Sending message to queue", destination, message.getDelay());
            MessagePostProcessor postProcessor = new ScheduleMessagePostProcessor(message.getDelay());
            this.jmsTemplate.convertAndSend(destination, message, postProcessor);
        } else {
            log.debug("[destination: {}] Sending message to queue", destination);
            jmsTemplate.convertAndSend(destination, message);
        }
    }

    abstract String getProducerName();

    private String getQueueName() {
        return "demo." + getProducerName();
    }

}
