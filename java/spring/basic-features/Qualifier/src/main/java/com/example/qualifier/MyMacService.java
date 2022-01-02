package com.example.qualifier;

import org.springframework.stereotype.Service;

@Service("myMacService")
public class MyMacService implements MyService{
    @Override
    public String getServiceName() {
        return "mac";
    }
}
