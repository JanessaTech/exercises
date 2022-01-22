package com.example.visitor.after;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCartClient {
    public static void main(String[] args) {
        List<Item> list = new ArrayList<>();
        list.add(new Book(20, "1234"));
        list.add(new Book(100, "5678"));
        list.add(new Fruit(10, 2, "Banana"));
        list.add(new Fruit(5, 5, "Apple"));

        Visitor visitor = new Visitor();

        int total = 0;

        for(Item item : list) {
            total += item.getCost(visitor);
        }

        System.out.println("Total Cost = "+total);
    }
}
