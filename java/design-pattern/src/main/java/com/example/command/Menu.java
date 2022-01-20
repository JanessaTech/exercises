package com.example.command;

import org.omg.CORBA.PUBLIC_MEMBER;

import java.util.HashMap;
import java.util.Map;

public class Menu {
    public final static int PIZZA = 0;
    public final static int CAKE = 1;
    public final static int FISHCHIP = 2;

    private Map<Integer, Command> content = new HashMap<Integer, Command>();

    Menu() {
        // init menu content
        Chef chef = new Chef();
        content.put(PIZZA, new Pizza(chef));
        content.put(CAKE, new Cake(chef));
        content.put(FISHCHIP, new FishChip(chef));
    }

    public void order(Integer dishNumber) {
        if (content.containsKey(dishNumber)) {
            Command command = content.get(dishNumber);
            command.execute();
        } else {
            System.out.println("Sorry, we cannot server it");
        }
    }

}
