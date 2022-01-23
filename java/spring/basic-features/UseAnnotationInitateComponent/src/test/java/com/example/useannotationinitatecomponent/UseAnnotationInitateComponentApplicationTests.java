package com.example.useannotationinitatecomponent;

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
    @Autowired Myservice myservice;

    @Test
    void contextLoads(){
        List<String> res = new ArrayList<>();
        Map<String, Object> map = applicationContext.getBeansWithAnnotation(Auditable.class);
        for(Map.Entry<String, Object> entry : map.entrySet()) {
            Object bean = entry.getValue();
            Annotation[] annotations = bean.getClass().getDeclaredAnnotations();
            for( Annotation an : annotations) {
                if( an instanceof Auditable) {
                    for(String v : ((Auditable)an).value()) {
                        res.add(v);
                    }
                }

            }
        }

        assertEquals("person.sleep", res.get(0));

        /*
        List<MyInfo> infoList = new ArrayList<>();



        for(Map.Entry<String, Object> entry : map.entrySet()) {
            Object bean = entry.getValue();

            Annotation[] annotations = bean.getClass().getDeclaredAnnotations();
            for(Annotation annotation : annotations) {
                if (annotation instanceof ConfigContainer) {
                    for (Config config : ((ConfigContainer) annotation).value()) {
                        MyInfo info = new MyInfo();
                        info.setName(config.name());
                        info.setAge(config.age());
                        infoList.add(info);
                    }
                }
            }
        }

        for(MyInfo myInfo : infoList) {
            log.info(myInfo.toString());
        }*/
    }

}
