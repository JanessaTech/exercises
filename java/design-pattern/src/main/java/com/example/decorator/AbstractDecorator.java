package com.example.decorator;

public abstract class AbstractDecorator implements Decorator{
    protected Decorator decorator;
    AbstractDecorator(Decorator decorator) {
        this.decorator = decorator;
    }

    public abstract void putOn();
}
