package com.example.qualifier;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

@SpringBootTest
class QualifierApplicationTests {

    @Autowired MyFactory myFactory;
    @Test void test() {
        MyService winService = myFactory.getService("Windows");
        MyService macService = myFactory.getService("mac");

        assertEquals("windows", winService.getServiceName());
        assertEquals("mac", macService.getServiceName());
    }

}
