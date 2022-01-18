package com.example.bridge;

public class Rectangle extends Shape{
    Rectangle(Color color) {
        super(color);
    }

    @Override
    void draw() {
        System.out.println(this.color.getName() + " rectangle");
    }
}
