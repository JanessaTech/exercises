package com.example.chain;

public class HandlerC extends AbstractHandler{
    HandlerC(String name) {
        super(name);
    }

    @Override
    public void handle(String request) {
        if(request.contains(name)) {
            System.out.println("request is handled by HandlerC");
        } else {
            System.out.println("pass in HandlerC");
            next.handle(request);
        }
    }
}
