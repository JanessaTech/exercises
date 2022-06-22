package com.main.demo;

import com.service.MyService;
import com.service.impl.MyServiceImpl;

public class Mydemo {
    public static void main(String[] args) {
        MyService myService = new MyServiceImpl();
        System.out.println(myService.execute("world"));

    }
}
