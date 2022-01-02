package com.example.injection.list;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class ListInjectionDemoTest {
    @Autowired
    ListInjectionDemo listInjectionDemo;

    @Test
    void test() {
        assertEquals("service A,service B,service C", listInjectionDemo.getAllNamesOfServices());
    }
}
