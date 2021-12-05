package com.example.basic;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

/**
 * we don't start web server at all when using @AutoConfigureMockMvc
 * However, the way we handle all incoming  HTTP requests is  exactly the same way as if we were processing
 * real incoming HTTP requests with a web server started
 */
//@RunWith(SpringRunner.class)
@AutoConfigureMockMvc  // it must be imported to enable MockMvc
@SpringBootTest
class BasicApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testEmployee() throws Exception {
        mockMvc.perform(get("/employee")).andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.name").value("Jane"))
                .andExpect(jsonPath("$.designation").value("manager"))
                .andExpect(jsonPath("$.empId").value("1"))
                .andExpect(jsonPath("$.salary").value(3000));

    }
}
