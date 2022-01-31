package com.example.transaction.annotation.controller;

import com.example.transaction.annotation.service.ServiceA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TransactionTestController {

    @Autowired
    private ServiceA serviceA;

    @GetMapping(value = "/case1")
    public void case1() {
        serviceA.case1();
    }

    @GetMapping(value = "/case2")
    public void case2() {
        serviceA.case2();
    }

    @GetMapping(value = "/case3")
    public void case3() {
        serviceA.case3();
    }

    @GetMapping(value = "/case4")
    public void case4() {
        serviceA.case4();
    }

    @GetMapping(value = "/case5")
    public void case5() {
        serviceA.case5();
    }

    @GetMapping(value = "/case6")
    public void case6() {
        serviceA.case6();
    }

    @GetMapping(value = "/case7")
    public void case7() {
        serviceA.case7();
    }

    @GetMapping(value = "/case8")
    public void case8() {
        serviceA.case8();
    }
}
