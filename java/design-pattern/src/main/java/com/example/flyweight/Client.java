package com.example.flyweight;

public class Client {
    public static void main(String[] args) {
        Container container = new Container();
        AbstractFlyWeight flyWeightA = container.get("A");
        AbstractFlyWeight flyWeightB = container.get("B");
        AbstractFlyWeight flyWeightAA = container.get("A");

        flyWeightA.operate("info A");
        flyWeightB.operate("info B");
        flyWeightAA.operate("info AA");

    }
}
