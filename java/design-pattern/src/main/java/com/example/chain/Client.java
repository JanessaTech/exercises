package com.example.chain;

public class Client {
    public static void main(String[] args) {
        Handler starter = new HandlerA("A");
        Handler handler2 = new HandlerB("B");
        Handler handler3 = new HandlerC("C");


        starter.setNext(handler2);
        handler2.setNext(handler3);

        starter.handle("*****C*****");

    }
}
