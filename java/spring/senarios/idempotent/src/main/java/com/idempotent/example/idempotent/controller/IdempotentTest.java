package com.idempotent.example.idempotent.controller;

import com.idempotent.example.idempotent.annotation.Idemponent;
import com.idempotent.example.idempotent.service.MyBusiness;
import com.idempotent.example.idempotent.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IdempotentTest {

    @Autowired
    TokenService tokenService;
    @Autowired
    MyBusiness myBusiness;

    @GetMapping("/test/idempotent")
    @Idemponent
    public void demoMethod() {
        myBusiness.demoMethod();
    }

    @GetMapping("/test/uuid")
    public String getUUId() {
        return tokenService.getToken();
    }
}
