package com.example.observer;

import java.util.ArrayList;
import java.util.List;

public abstract class Celebrity {
    protected List<Fan> fans = new ArrayList<>();

    void subscribe(Fan fan) {
        fans.add(fan);
    }

    void unsubscribe(Fan fan) {
        fans.remove(fan);
    }

    abstract void post(String mgs);
}
