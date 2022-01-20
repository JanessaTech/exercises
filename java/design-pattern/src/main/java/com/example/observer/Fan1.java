package com.example.observer;

public class Fan1 implements Fan{
    @Override
    public void receive(String msg) {
        System.out.println("fan1 received msg from wang fei:" + msg);
    }
}
