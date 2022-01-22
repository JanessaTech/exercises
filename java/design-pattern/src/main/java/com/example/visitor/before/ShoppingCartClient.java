package com.example.visitor.before;

public class ShoppingCartClient {
    public static void main(String[] args) {
        Book book1 = new Book(20, "1234");
        Book book2 = new Book(100, "5678");
        Fruit fruit1 = new Fruit(10, 2, "Banana");
        Fruit fruit2 = new Fruit(5, 5, "Apple");

        int total = 0;
        total += book1.getCost();
        total += book2.getCost();
        total += fruit1.getCost();
        total += fruit2.getCost();

        System.out.println("Total Cost = "+total);

    }
}
