package com.example.composite;

import java.util.List;

public class Leaf extends AbstractNode{
    Leaf(String name) {
        super(name);
    }

    @Override
    public List<Node> getChildren() {
        return null;
    }

    @Override
    public void addChild(Node node) {

    }

    @Override
    public void removeChild(int i) {

    }
}
