package com.example.consumer2.consumer;

import com.example.common.model.MyBusinessMessage;
import com.example.consumer2.util.CustomerMessageConverter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import javax.jms.Message;
import javax.jms.MessageListener;

@Slf4j
public abstract class AbstractMessageConsumer implements MessageListener {
    private static final Integer DEFAULT_CONSUMER_COUNT = 1;

    @Autowired
    CustomerMessageConverter converter;

    @Override
    public void onMessage(Message message) {
        try {
            log.info("[INCOMING_MESSAGE][RAW] MESSAGE: {}", message);
            Object msg = converter.fromMessage(message);
            log.info("[INCOMING_MESSAGE][PARSED] MESSAGE: {}", msg);
            if (msg != null) {
                MyBusinessMessage bMsg = (MyBusinessMessage) msg;
                log.info("[INCOMING_MESSAGE][HANDLE_MESSAGE] MESSAGE: {}", bMsg);
                handleMessage(bMsg);
                log.info("[INCOMING_MESSAGE][ALREADY_HANDLED_MESSAGE] MESSAGE: {}", bMsg);
            }

        } catch (Exception e) {
            log.warn("[INCOMING_MESSAGE][ERROR_HANDLING_MESSAGE] MESSAGE: {}, ERROR: {}", message, e);
            throw new RuntimeException(e);
        }

    }

    public Integer getConsumersCount() {
        return DEFAULT_CONSUMER_COUNT;
    }

    protected abstract void handleMessage(MyBusinessMessage message);
}
