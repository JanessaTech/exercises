package com.example.flyweight;

public abstract class AbstractFlyWeight {
    protected String key;

    AbstractFlyWeight(String key) {
        this.key = key;
    }

    public abstract void operate(String externalInfo);
}
