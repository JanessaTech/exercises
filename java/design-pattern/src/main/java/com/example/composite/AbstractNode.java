package com.example.composite;

public abstract class AbstractNode implements Node{
    private String name;
    AbstractNode(String name) {
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public abstract void addChild(Node node);

    public abstract void removeChild(int i);
}
