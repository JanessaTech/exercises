package com.example.observer;

public class Wangfei extends Celebrity{

    @Override
    void post(String msg) {
        System.out.println("wang fei said: " + msg);

        for (Fan fan : fans) {
            fan.receive(msg);
        }

    }
}
