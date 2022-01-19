package com.example.composite;

import java.util.ArrayList;
import java.util.List;

public class NonLeaf extends AbstractNode{
    private List<Node> children= new ArrayList<>();

    public NonLeaf(String name) {
        super(name);
    }

    @Override
    public List<Node> getChildren() {
        return this.children;
    }

    @Override
    public void addChild(Node node) {
        children.add(node);
    }

    @Override
    public void removeChild(int i) {
        if (i < children.size()) {
            children.remove(i);
        }
    }
}
