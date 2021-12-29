package com.example.useconfigbeanxmlfileofanotherproject;

import com.example.integratexmlconfiguration.Pojo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = UseConfigbeanXmlFileOfAnotherProjectApplication.class)
public class UseConfigbeanXmlFileOfAnotherProjectApplicationTests {
    @Autowired
    private Pojo pojo;

    @Test
    public void whenCallingPojoDefinedInAnotherProject() {
        System.out.println("pojo.getField() = " + pojo.getField());
    }
}
