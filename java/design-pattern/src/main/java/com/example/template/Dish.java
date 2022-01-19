package com.example.template;

public abstract class Dish {
    private String name;

    Dish(String name) {
        this.name = name;
    }

    public void cook() {
        prepare();
        inProcess();
        afterDone();
    }
    String getName() {
        return this.name;
    }
    abstract void prepare();
    abstract void inProcess();
    void afterDone() {
        System.out.println(getName() + " is ready to eat");
    }

}
