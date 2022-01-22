package com.example.state;

public class Context {
    private State state;

    public Context() {
        this.state = new StateA();
        showState();
    }

    public void setState(State state) {
        this.state = state;
        showState();
    }

    void handle() {
        this.state.handle(this);
    }

    private void showState() {
        System.out.println(this.state);
    }
}
