package com.example.consumer2.starter;

import com.example.consumer2.consumer.AbstractMessageConsumer;
import com.example.consumer2.util.ActiveMQHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import javax.jms.MessageListener;
import java.util.Arrays;

public interface MyBusinessMessageConsumer {
    void start();
}

@Slf4j
@Component
class MyBusinessMessageConsumerImpl implements MyBusinessMessageConsumer {

    @Autowired
    ApplicationContext applicationContext;

    @Autowired
    ActiveMQHelper activeMQHelper;

    @Override
    public void start() {
        long x1 = System.currentTimeMillis();
        Exception exception = null;
        try {
            log.debug("starting up message consumer process");

            String[] beans = applicationContext.getBeanNamesForType(MessageListener.class);

            if (beans.length == 0) {
                log.error("Unable to find any message listeners from context");
                throw new IllegalArgumentException();
            }

            Arrays.stream(beans).forEach(it ->{
                String queue = "demo." + it.substring(0, it.indexOf("ConsumerImpl"));

                AbstractMessageConsumer messageConsumer = (AbstractMessageConsumer) applicationContext.getBean(it);
                activeMQHelper.startMessageListener(queue, messageConsumer);

            });
        }catch (Exception e) {
            log.error("unable to start message consumer, something went wrong: {}", e.getMessage(), e);
            exception = e;
            throw  e;
        } finally {
            if (exception == null) {
                log.debug("message consumer has started in {}ms", System.currentTimeMillis() - x1);
            }
            else {
                log.error("message consumer failed to started!");
            }
        }
    }
}
