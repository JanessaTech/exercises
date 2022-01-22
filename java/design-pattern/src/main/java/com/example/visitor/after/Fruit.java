package com.example.visitor.after;

import lombok.Data;

@Data
public class Fruit implements Item{
    private int pricePerKg;
    private int weight;
    private String name;

    public Fruit(int priceKg, int wt, String nm)
    {
        this.pricePerKg=priceKg;
        this.weight=wt;
        this.name = nm;
    }

    public int getCost(Visitor visitor) {
        return visitor.getCost(this);
    }
}
