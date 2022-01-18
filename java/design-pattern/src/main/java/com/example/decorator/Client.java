package com.example.decorator;

public class Client {
    public static void main(String[] args) {
        Person person = new Person();
        Decorator decorator = new Shoes(new Dress(new UnderCloth(person)));
        decorator.putOn();
    }
}
