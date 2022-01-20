package com.example.observer;

public class Fan2 implements Fan{
    @Override
    public void receive(String msg) {
        System.out.println("fan2 received msg from wang fei:" + msg);
    }
}
