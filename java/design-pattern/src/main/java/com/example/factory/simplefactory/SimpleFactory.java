package com.example.factory.simplefactory;

public class SimpleFactory {
    static final int TYPE_A = 0;
    static final int TYPE_B = 1;

    public static Product create(int type) {
        switch (type) {
            case 0 : return new ProductA();
            case 1 : return new ProductB();
            default: return null;
        }
    }
}
