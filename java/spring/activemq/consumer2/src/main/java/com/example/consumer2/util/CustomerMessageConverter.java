package com.example.consumer2.util;

import com.example.common.model.MyBusinessMessage;
import lombok.extern.slf4j.Slf4j;
import org.apache.activemq.command.ActiveMQObjectMessage;
import org.springframework.jms.support.converter.MessageConversionException;
import org.springframework.jms.support.converter.MessageConverter;
import org.springframework.stereotype.Component;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;
import java.io.Serializable;

@Slf4j
@Component
public class CustomerMessageConverter implements MessageConverter {
    @Override
    public Message toMessage(Object object, Session session) throws JMSException, MessageConversionException {
        if (object instanceof MyBusinessMessage) {
            ActiveMQObjectMessage objectMessage = (ActiveMQObjectMessage) session.createObjectMessage();
            objectMessage.setObject((Serializable) object);
            return objectMessage;
        }
        return null;
    }

    @Override
    public Object fromMessage(Message message) throws JMSException, MessageConversionException {
        if (message instanceof ActiveMQObjectMessage) {
            ActiveMQObjectMessage msg = (ActiveMQObjectMessage) message;
            try {
                return msg.getObject();
            } catch (Exception e) {
                log.warn("Unable to get message object from BillfoldMessage: {}", e.getMessage(), e);
            }
        }
        else {
            log.warn("Invalid message class, should be instance of ActiveMQObjectMessage: {}", message);
        }
        return null;
    }
}
