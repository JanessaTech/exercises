package com.example.usageoftestpropertysource;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations = "/application-test.properties")
public class SpringBootPropertySourceTest {
    @Value("${name}")
    private String name;

    @Test
    public void testName(){
        Assert.assertEquals("Jane-test", name);
    }
}
