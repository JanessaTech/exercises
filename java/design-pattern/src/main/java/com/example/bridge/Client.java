package com.example.bridge;

public class Client {
    public static void main(String[] args) {
        Shape circle1 = new Circle(new Red());
        Shape circle2 = new Circle(new Blue());
        Shape rectangle1 = new Rectangle(new Red());
        Shape rectangle2 = new Rectangle(new Blue());

        circle1.draw();
        circle2.draw();
        rectangle1.draw();
        rectangle2.draw();
    }
}
