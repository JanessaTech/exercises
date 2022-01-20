package com.example.chain;

public class HandlerA extends AbstractHandler {
    HandlerA(String name) {
        super(name);
    }

    @Override
    public void handle(String request) {
        if (request.contains(name)) {
            System.out.println("request is handled by HandlerA");
        } else {
            System.out.println("pass in HandlerA");
            next.handle(request);
        }
    }
}

