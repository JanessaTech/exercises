package com.example.observer;

public class Fan3 implements Fan{
    @Override
    public void receive(String msg) {
        System.out.println("fan3 received msg from wang fei:" + msg);
    }
}
