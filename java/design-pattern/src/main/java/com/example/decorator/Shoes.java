package com.example.decorator;

public class Shoes extends AbstractDecorator{
    Shoes(Decorator decorator) {
        super(decorator);
    }

    @Override
    public void putOn() {
        this.decorator.putOn();
        System.out.println("I am going to wear shoes");
    }
}
