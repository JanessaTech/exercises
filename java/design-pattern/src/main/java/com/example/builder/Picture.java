package com.example.builder;

public class Picture {
    private Moutain moutain;
    private Tree tree;
    private House house;

    public void setMoutain(Moutain moutain) {
        this.moutain = moutain;
    }

    public void setTree(Tree tree) {
        this.tree = tree;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public void show() {
        moutain.show();
        tree.show();
        house.show();
    }
}
