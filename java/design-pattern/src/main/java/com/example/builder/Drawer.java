package com.example.builder;

public class Drawer {
    private Builder builder;
    Drawer(Builder builder) {
        this.builder = builder;
    }

    public Picture draw() {
        Picture picture = new Picture();
        picture.setHouse(builder.drawHouse());
        picture.setMoutain(builder.drawMoutain());
        picture.setTree(builder.drawTree());
        return picture;
    }
}
