package com.example.builder;

public class WinterBuilder implements Builder{
    @Override
    public Moutain drawMoutain() {
        return new WinterMoutain();
    }

    @Override
    public Tree drawTree() {
        return new WinterTree();
    }

    @Override
    public House drawHouse() {
        return new WinterHouse();
    }
}
