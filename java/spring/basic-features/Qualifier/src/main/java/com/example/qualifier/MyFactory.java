package com.example.qualifier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class MyFactory {
    @Autowired
    @Qualifier("myWindowsService")
    private MyService windowsService;

    @Autowired
    @Qualifier("myMacService")
    private MyService macService;

    public MyService getService(String serviceNeeded){
        if(serviceNeeded == "Windows"){
            return windowsService;
        } else {
            return macService;
        }
    }

}
