package com.example.injection.construtor;

import com.example.injection.MyBusiness;
import com.example.injection.constructor.ConstructorInjectionDemo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;
@SpringBootTest
public class ConstructorInjectionDemoTests {

    @Autowired
    ConstructorInjectionDemo constructorInjectionDemo;
    @Test
    void test() {
        MyBusiness myBusiness = constructorInjectionDemo.getMyBusiness();

        assertEquals("service A,service B,service C", myBusiness.getAllNamesOfServices());
    }
}
