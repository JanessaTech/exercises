package com.example.common.model;

import java.io.Serializable;
import java.util.HashMap;

public class MyBusinessMessage implements Serializable {
    private static final long serialVersionUID = 1L;
    private int delay = 0;
    private HashMap<String, Object> params = new HashMap<>();

    public void setDelay(int delay) {this.delay = delay;}

    public void setMessage(String key, Object value) {
        params.put(key, value);
    }

    public int getDelay() { return this.delay;}

    public HashMap<String, ?> getParams() {return this.params;}
}
