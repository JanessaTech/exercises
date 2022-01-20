package com.example.chain;

public interface Handler {
    void handle(String request);
    void setNext(Handler handler);
}
