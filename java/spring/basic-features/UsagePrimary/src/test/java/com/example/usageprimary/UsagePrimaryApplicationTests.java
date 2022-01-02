package com.example.usageprimary;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.*;

@SpringBootTest
class UsagePrimaryApplicationTests {

    @Autowired
    ManagerService managerService;

    @Test
    void testManager() {
        Manager manager = managerService.getManager();
        assertEquals("General manager", manager.getManagerName());
    }

}
