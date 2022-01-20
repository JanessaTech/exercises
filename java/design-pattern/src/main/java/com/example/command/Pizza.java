package com.example.command;

public class Pizza extends AbstractCommand{
    Pizza(Chef chef) {
        super(chef);
    }

    @Override
    public void execute() {
        this.chef.makePizza();
    }
}
