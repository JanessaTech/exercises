package com.example.chain;

public abstract class AbstractHandler implements Handler{
    protected String name;
    protected Handler next;
    AbstractHandler(String name) {
        this.name = name;
    }

    @Override
    public void setNext(Handler handler) {
        this.next = handler;
    }
}
