package com.example.integratexmlconfiguration;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpringBootXmlApplication.class)
public class SpringBootXmlApplicationIntegrationTest {
    @Autowired
    private Pojo pojo;

    @Test
    public void whenCallingGetter_thenPrintingProperty() {
        System.out.println("pojo.getField() = " + pojo.getField());
    }
}
