package com.example.visitor.before;

import lombok.Data;

@Data
public class Fruit {
    private int pricePerKg;
    private int weight;
    private String name;

    public Fruit(int priceKg, int wt, String nm)
    {
        this.pricePerKg=priceKg;
        this.weight=wt;
        this.name = nm;
    }

    int getCost() {
        int cost = getPricePerKg() * getWeight();
        System.out.println(getName() + " cost = " + cost);
        return cost;
    }
}
