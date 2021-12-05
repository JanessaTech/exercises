package com.example.activeprofilesdemo;


import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("dev")
public class SpringBootProfileDevTest {

    @Value("${name}")
    String name;

    @Test
    void testName(){
        Assert.assertEquals("Jane-dev",name);
    }
}
