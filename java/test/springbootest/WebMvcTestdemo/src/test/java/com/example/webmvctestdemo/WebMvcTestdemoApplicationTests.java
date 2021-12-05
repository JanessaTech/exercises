package com.example.webmvctestdemo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(Controller1.class)
class WebMvcTestdemoApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GreetingService service;

    @Test
    void contextLoads() {
    }

    @Test
    public void greetingShouldReturnMessageFromService() throws Exception {
        when(service.greeting()).thenReturn("Hello Mock");
        this.mockMvc.perform(get("/test1")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Hello Mock")));
    }

}
