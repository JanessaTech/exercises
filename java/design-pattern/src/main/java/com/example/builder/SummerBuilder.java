package com.example.builder;

public class SummerBuilder implements Builder{
    @Override
    public Moutain drawMoutain() {
        return new SummerMoutain();
    }

    @Override
    public Tree drawTree() {
        return new SummerTree();
    }

    @Override
    public House drawHouse() {
        return new SummerHouse();
    }
}
