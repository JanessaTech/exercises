package com.example.usemyservice;

import com.example.autoconfig1.MyService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class UseMyserviceApplicationTests {
    @Autowired
    private MyService myService;

    @Test
    void contextLoads() {
       System.out.println(myService.say());
    }

}
