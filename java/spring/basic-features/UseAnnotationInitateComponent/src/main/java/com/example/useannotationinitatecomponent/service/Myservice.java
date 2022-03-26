package com.example.useannotationinitatecomponent.service;

import com.example.useannotationinitatecomponent.annotation.PropertyConfig;
import com.example.useannotationinitatecomponent.annotation.PropertyValue;
import com.example.useannotationinitatecomponent.pojo.MyInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class Myservice {

    @Autowired ApplicationContext applicationContext;

    List<MyInfo> infoList = new ArrayList<>();

    List<MyInfo> getInfoList() {
        return this.infoList;
    }

    @PostConstruct
    void start(){
        Map<String, Object> map = applicationContext.getBeansWithAnnotation(PropertyConfig.class);
        log.info("Running in start method in Myservice class ...");

        map.forEach((key, value) -> {
            log.info("Bean name:{}, bean class :{}", key, value);
            Method[] methods = value.getClass().getMethods();
            for (Method method : methods) {
                if (method.isAnnotationPresent(PropertyValue.class)) {
                    Annotation[] annotations = method.getDeclaredAnnotations();
                    PropertyValue propertyValue = (PropertyValue)annotations[0];
                    MyInfo myInfo = new MyInfo(propertyValue.name(), propertyValue.age(), propertyValue.flag());
                    infoList.add(myInfo);
                }
            }
        });


        for(MyInfo myInfo : infoList) {
            log.info(myInfo.toString());
        }
    }
}
