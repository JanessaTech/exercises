package com.example.chain;

public class HandlerB extends AbstractHandler{

    HandlerB(String name) {
        super(name);
    }


    @Override
    public void handle(String request) {
        if(request.contains(name)) {
            System.out.println("request is handled by HandlerB");
        } else {
            System.out.println("pass in HandlerB");
            next.handle(request);
        }
    }
}
