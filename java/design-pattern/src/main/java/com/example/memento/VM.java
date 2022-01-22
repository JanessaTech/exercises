package com.example.memento;

public class VM {
    private String state;
    VM(String state) {
        this.state = state;
        showState();
    }

    public void setState(String state) {
        this.state = state;
        showState();
    }

    public Snapshot takeSnapshot() {
        System.out.println("Taking snapshot ...");
        return new Snapshot(this.state);
    }

    public void restore(Snapshot snapshot) {
        this.state = snapshot.getState();
        System.out.println("restore snapshot ...");
        showState();
    }

    private void showState() {
        System.out.println(this.state);
    }
}
