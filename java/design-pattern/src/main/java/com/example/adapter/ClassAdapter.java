package com.example.adapter;

public class ClassAdapter extends Adaptee implements Target{
    @Override
    public void request() {
        this.specificRequest();
    }

    public static void main(String[] args) {
        Target target = new ClassAdapter();
        target.request();
    }
}
