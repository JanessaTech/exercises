package com.spring.event.example.springevent.po;

import org.springframework.context.ApplicationEvent;

public class ProductOrderEvent extends ApplicationEvent {
    private String orderId;
    public ProductOrderEvent(Object source, String orderId) {
        super(source);
        this.orderId = orderId;
    }

    public String getOrderId() {
        return orderId;
    }
}
