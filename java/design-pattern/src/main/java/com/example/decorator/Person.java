package com.example.decorator;

public class Person implements Decorator{
    @Override
    public void putOn() {
        System.out.println("I am naked");
    }
}
