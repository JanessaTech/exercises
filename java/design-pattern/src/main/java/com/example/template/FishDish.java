package com.example.template;

public class FishDish extends Dish{
    FishDish(String name) {
        super(name);
    }

    @Override
    void prepare() {
        System.out.println("clean fish ....");
    }

    @Override
    void inProcess() {
        System.out.println("fry fish ...");
    }
}
