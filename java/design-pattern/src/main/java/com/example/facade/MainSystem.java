package com.example.facade;

public class MainSystem {
    private SubSystemA subSystemA = new SubSystemA();
    private SubSystemB subSystemB = new SubSystemB();
    private SubSystemC subSystemC = new SubSystemC();

    public void mainMethod() {
        subSystemA.methodA();
        subSystemB.methodB();
        subSystemC.methodC();
    }

    public static void main(String[] args) {
        MainSystem mainSystem = new MainSystem();
        mainSystem.mainMethod();
    }
}
