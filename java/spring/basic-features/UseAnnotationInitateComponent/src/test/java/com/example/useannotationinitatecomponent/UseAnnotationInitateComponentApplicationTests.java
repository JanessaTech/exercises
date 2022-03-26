package com.example.useannotationinitatecomponent;

import com.example.useannotationinitatecomponent.service.Myservice;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

@Slf4j
@SpringBootTest
class UseAnnotationInitateComponentApplicationTests {
    @Autowired
    ApplicationContext applicationContext;
    @Autowired
    Myservice myservice;

    @Test
    void contextLoads(){
    }

}
