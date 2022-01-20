package com.example.observer;

public class Client {
    public static void main(String[] args) {
        Celebrity wangfei = new Wangfei();
        Fan fan1 = new Fan1();
        Fan fan2 = new Fan2();
        Fan fan3 = new Fan3();

        wangfei.subscribe(fan1);
        wangfei.subscribe(fan2);
        wangfei.subscribe(fan3);
        wangfei.post("Hi, fans, I love you!");
    }
}
