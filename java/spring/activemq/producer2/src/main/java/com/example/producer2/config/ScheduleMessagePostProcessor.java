package com.example.producer2.config;

import org.apache.activemq.ScheduledMessage;
import org.springframework.jms.core.MessagePostProcessor;

import javax.jms.JMSException;
import javax.jms.Message;

public class ScheduleMessagePostProcessor implements MessagePostProcessor {
    private Long delayTime = 0L;

    ScheduleMessagePostProcessor(long delayTime) {this.delayTime = delayTime;}
    @Override
    public Message postProcessMessage(Message message) throws JMSException {
        if (delayTime > 0L) {
            message.setLongProperty(ScheduledMessage.AMQ_SCHEDULED_DELAY, delayTime);
        }
        return message;
    }
}
