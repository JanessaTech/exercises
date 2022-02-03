package com.example.greeter;

public class Greeter {
    private GreetingConfig config;
    public Greeter(GreetingConfig greetingConfig) {
        this.config = greetingConfig;
    }

    public String greet() {
        return String.format("%s says : %s", config.getUserName(), config.getGreetingMsg());
    }
}
