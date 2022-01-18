package com.example.proxy;

public class Client {
    public static void main(String[] args) {
        Proxy proxy = new ProxyA();

        proxy.deposit(100);
        proxy.withDraw(20);
        proxy.query();
    }
}
