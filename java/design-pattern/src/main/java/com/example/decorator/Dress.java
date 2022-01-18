package com.example.decorator;

public class Dress extends AbstractDecorator{
    Dress(Decorator decorator) {
        super(decorator);
    }

    @Override
    public void putOn() {
        this.decorator.putOn();
        System.out.println("I am going to wear dress");
    }
}
