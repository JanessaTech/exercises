package com.spring.event.example.springevent.controller;

import com.spring.event.example.springevent.service.ProductOrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class EventController {
    @Autowired
    ProductOrderService productOrderService;

    @PostMapping("/orders/{id}")
    public void buyOrder(@PathVariable(name = "id", required = true) String orderId) {
        log.info("Thread {} is running in EventController.buyOrder. orderId={}", Thread.currentThread().getName(), orderId);
        productOrderService.buyOrder(orderId);
        log.info("Thread {} is finished in EventController.buyOrder. orderId={}", Thread.currentThread().getName(), orderId);
    }
}
