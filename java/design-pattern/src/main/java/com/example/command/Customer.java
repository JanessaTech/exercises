package com.example.command;

public class Customer {
    public static void main(String[] args) {
        Menu menu = new Menu();
        menu.order(Menu.CAKE);
        menu.order(Menu.PIZZA);
        menu.order(Menu.FISHCHIP);
    }
}
