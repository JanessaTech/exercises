package com.example.builder;

public class Client {
    public static void main(String[] args) {
        Builder winBuilder = new WinterBuilder();
        Drawer drawer = new Drawer(winBuilder);
        Picture winPic = drawer.draw();
        winPic.show();

        System.out.println("============================================");

        Builder summerBuilder = new SummerBuilder();
        drawer = new Drawer(summerBuilder);
        Picture sumPic = drawer.draw();
        sumPic.show();

    }
}
