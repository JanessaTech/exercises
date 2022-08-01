package com.spring.event.example.springevent.listener;

import com.spring.event.example.springevent.po.ProductOrderEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ProductOrderListener implements ApplicationListener<ProductOrderEvent> {
    @Override
    public void onApplicationEvent(ProductOrderEvent event) {
        log.info("Thread {} received ProductOrderEvent, orderId={}", Thread.currentThread().getName(), event.getOrderId());
        try {
            Thread.sleep(5000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("Thread {} is finished with ProductOrderEvent, orderId={}", Thread.currentThread().getName(), event.getOrderId());
    }
}
