package com.example.bridge;

public class Circle extends Shape{
    Circle(Color color) {
        super(color);
    }

    @Override
    public void draw() {
        System.out.println(this.color.getName() + " circle");
    }
}
