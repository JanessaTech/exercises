package com.example.factory.simplefactory;

public class Client {
    public static void main(String[] args) {
        Product productA = SimpleFactory.create(SimpleFactory.TYPE_A);
        Product productB = SimpleFactory.create(SimpleFactory.TYPE_B);

        productA.show();
        productB.show();
    }
}
