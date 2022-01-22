package com.example.memento;

public class History {
    private Snapshot snapshot;

    public void setSnapshot(Snapshot snapshot) {
        this.snapshot = snapshot;
    }

    public Snapshot getSnapshot() {
        return this.snapshot;
    }
}
