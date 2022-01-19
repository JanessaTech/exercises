package com.example.template;

public class Client {
    public static void main(String[] args) {
        Dish fishDish = new FishDish("fish");
        fishDish.cook();

        System.out.println("---------------------------------");

        Dish potatoDish = new VegetableDish("potato");
        potatoDish.cook();
    }
}
