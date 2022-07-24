package com.spring.event.example.springevent.service;

import com.spring.event.example.springevent.po.ProductOrderEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ProductOrderService {
    @Autowired
    private ApplicationEventPublisher publisher;

    public void buyOrder(String orderId) {
        log.info("Thread {} starts to send ProductOrderEvent, orderId={}", Thread.currentThread().getName(), orderId);
        ProductOrderEvent productOrderEvent = new ProductOrderEvent(this, orderId);
        publisher.publishEvent(productOrderEvent);
    }
}
