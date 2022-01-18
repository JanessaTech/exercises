package com.example.singleton;

public class HungerySingleton {
    private static volatile HungerySingleton intance = null;

    public static synchronized HungerySingleton getInstance() {
        if (intance == null) {
            intance = new HungerySingleton();
        }
        return intance;
    }
}
