package com.example.flyweight;

import java.util.HashMap;
import java.util.Map;

public class Container {
    private Map<String, AbstractFlyWeight> map = new HashMap<>();

    public AbstractFlyWeight get(String key) {
        if (!map.containsKey(key)) {
            map.put(key, new ConcreteFlyWeight(key));
        }
        return map.get(key);
    }
}
