package com.example.command;

public class Cake extends AbstractCommand{
    Cake(Chef chef) {
        super(chef);
    }

    @Override
    public void execute() {
        this.chef.makeCake();
    }
}
