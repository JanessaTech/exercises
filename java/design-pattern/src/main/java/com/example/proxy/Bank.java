package com.example.proxy;

public class Bank {
    private int money = 0;
    void withDraw(int amount) {
        System.out.println("withDraw " + amount + " from bank");
        if (amount > money) {
            System.out.println("not enough money to withdraw");
            return;
        }
        money = money - amount;
    }

    void deposit(int amount) {
        System.out.println("deposit " + amount + " to bank");
        money += amount;
    }

    int query() {
        System.out.println(money + " left");
        return this.money;
    }
}
