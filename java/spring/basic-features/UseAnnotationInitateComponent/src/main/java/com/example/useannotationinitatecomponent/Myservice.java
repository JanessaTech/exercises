package com.example.useannotationinitatecomponent;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.lang.annotation.Annotation;
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
    void init(){
        Map<String, Object> map = applicationContext.getBeansWithAnnotation(ConfigContainer.class);



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
        }
    }
}
