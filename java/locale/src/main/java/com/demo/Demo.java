package com.demo;

import java.util.Locale;
import java.util.ResourceBundle;

public class Demo {
    public static void printlnMessage(Locale locale) {
        ResourceBundle bundle = null;
        if ( locale == null) {
            bundle = ResourceBundle.getBundle("message");
        } else {
            bundle = ResourceBundle.getBundle("message", locale);
        }

        String message = bundle.getString("label");
        System.out.println(message);
    }
    public static void main(String[] args) {
        printlnMessage(null);
        printlnMessage(new Locale("en","US"));
        printlnMessage(new Locale("ja","JP"));
    }
}
