package com.example.memento;

public class Snapshot {
    private String state;

    public Snapshot(String state) {
        this.state = state;
    }

    public String getState() {
        return this.state;
    }
}
