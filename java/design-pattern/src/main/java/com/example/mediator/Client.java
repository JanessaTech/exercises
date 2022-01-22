package com.example.mediator;

public class Client {
    public static void main(String[] args) {
        RealEstator realEstator = new RealEstator();
        Buyer Tom = new Buyer("Tom");
        Buyer Kelly = new Buyer("Kelly");

        Seller lucy = new Seller("lucy");
        Seller Kate = new Seller("kate");

        realEstator.registerBuyer(Tom);
        realEstator.registerBuyer(Kelly);
        realEstator.registerSeller(lucy);
        realEstator.registerSeller(Kate);

        Tom.send( "I want to buy a small house less than 1 million");
        Kate.send("I want to sell a large house more than 1 million");

    }
}
