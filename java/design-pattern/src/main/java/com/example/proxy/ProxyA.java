package com.example.proxy;

public class ProxyA implements Proxy{
    private Bank bank;
    ProxyA() {
        this.bank = new Bank();
    }

    public void withDraw(int amount) {
        bank.withDraw(amount);
        return;
    }

    public void deposit(int amount) {
        this.bank.deposit(amount);
    }

    public int query() {
        return this.bank.query();
    }
}
