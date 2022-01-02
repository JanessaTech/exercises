package com.example.qualifier;

import org.springframework.stereotype.Service;

@Service("myWindowsService")
public class MyWindowsService implements MyService{
    @Override
    public String getServiceName() {
        return "windows";
    }
}
