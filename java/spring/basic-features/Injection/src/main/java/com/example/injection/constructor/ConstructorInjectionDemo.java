package com.example.injection.constructor;

import com.example.injection.MyBusiness;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConstructorInjectionDemo {

    private MyBusiness myBusiness;

    @Autowired
    ConstructorInjectionDemo(MyBusiness myBusiness) {
        this.myBusiness = myBusiness;
    }

    public MyBusiness getMyBusiness() {
        return this.myBusiness;
    }
}
