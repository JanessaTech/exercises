package com.example.singleton;

public class LazySingleton {
    private static LazySingleton instance = new LazySingleton();

    public static LazySingleton getInstance() {
        return instance;
    }

}
