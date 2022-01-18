package com.example.adapter;

public class ObjectAdpter implements Target{
    public Adaptee adaptee;
    ObjectAdpter(Adaptee adaptee) {
        this.adaptee  = adaptee;
    }

    @Override
    public void request() {
        this.adaptee.specificRequest();
    }

    public static void main(String[] args) {
        Adaptee adaptee = new Adaptee();
        Target target = new ObjectAdpter(adaptee);
        target.request();
    }
}
