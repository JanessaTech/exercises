package com.example.command;

public abstract class AbstractCommand implements Command{
    protected Chef chef;

    AbstractCommand(Chef chef) {
        this.chef = chef;
    }
}
