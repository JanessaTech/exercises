package com.example.greeterspringbootsampleapp;

import com.example.greeter.Greeter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GreeterSpringBootSampleAppApplicationTests {
    @Autowired
    private Greeter greeter;

    @Test
    void testGreeter() {
        String msg = greeter.greet();
        System.out.println(msg);
    }

}
