package com.example.flyweight;

public class ConcreteFlyWeight extends AbstractFlyWeight{
    ConcreteFlyWeight(String key) {
        super(key);
    }

    @Override
    public void operate(String info) {
        System.out.println("key:" + this.key + " info:" + info);
    }
}
