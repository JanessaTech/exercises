package com.example.command;

public class FishChip extends AbstractCommand{
    FishChip(Chef chef) {
        super(chef);
    }

    @Override
    public void execute() {
        this.chef.makeFishAndChip();
    }
}
