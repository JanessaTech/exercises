package com.example.usageofifprofilevalue;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.IfProfileValue;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * The test case will only only when prod profile is activated
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UsageOfIfProfileValueApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@IfProfileValue(name = "spring.profiles.active", values = {"prod"})
class UsageOfIfProfileValueApplicationProdTests {
    @Value("${name}")
    private String name;

    @Test
    void contextLoads() {
    }

    @Test
    public void testName(){
        Assert.assertEquals("Jane-prod", name);
    }
}
