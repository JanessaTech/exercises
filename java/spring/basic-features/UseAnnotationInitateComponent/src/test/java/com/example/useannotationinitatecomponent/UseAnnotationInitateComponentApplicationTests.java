package com.example.useannotationinitatecomponent;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class UseAnnotationInitateComponentApplicationTests {
    @Autowired Myservice myservice;

    @Test
    void contextLoads() {
        myservice.init();
        List<MyInfo> myInfoList = myservice.getInfoList();
        System.out.println(myInfoList);
    }

}
