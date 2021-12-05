package com.example.springboottestusingproperties;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = "name=fakeName")
class SpringBootTestUsingPropertiesApplicationTests {

    @Value("${name}")
    private String name;
    @Test
    void contextLoads() {
    }

    @Test
    public void testName(){
        Assert.assertEquals("fakeName", name);
    }

}
