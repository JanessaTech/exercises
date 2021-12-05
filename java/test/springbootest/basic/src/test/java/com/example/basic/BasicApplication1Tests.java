package com.example.basic;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * The @SpringBootTest annotation tells Spring Boot to look for a main configuration class
 * (one with @SpringBootApplication, for instance) and use that to start a Spring application context
 *
 *  The use of webEnvironment=RANDOM_PORT to start the server with a random port
 *  (useful to avoid conflicts in test environments
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BasicApplication1Tests {
    @LocalServerPort
    private int port;
    @Autowired
    private TestRestTemplate restTemplate;

    /**
     * @SpringBootTest must be used at the head of BasicApplication1Tests
     */
    @Autowired
    private TestController testController;

    @Test
    public void contextLoads() throws Exception {
        /**
         * To verify testController is autowired successfully
         */
        assertThat(testController).isNotNull();
    }


    @Test
    public void testEmployee() throws Exception {
        Employee emp = restTemplate.getForObject("http://localhost:" + port + "/employee", Employee.class);
        Assert.assertEquals("Jane", emp.getName());

    }
}
