package com.example.template;

public class VegetableDish extends Dish{
    VegetableDish(String name) {
        super(name);
    }

    @Override
    void prepare() {
        System.out.println("clean and slice potatoes");
    }

    @Override
    void inProcess() {
        System.out.println("stir-fry potatoes ...");
    }
}
