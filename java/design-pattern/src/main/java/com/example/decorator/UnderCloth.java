package com.example.decorator;

public class UnderCloth extends AbstractDecorator{
    UnderCloth(Decorator decorator) {
        super(decorator);
    }

    @Override
    public void putOn() {
        this.decorator.putOn();
        System.out.println("I am going to wear underCloth");

    }
}
