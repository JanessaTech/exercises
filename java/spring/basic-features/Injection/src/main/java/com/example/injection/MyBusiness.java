package com.example.injection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MyBusiness {
    @Autowired
    private List<MyService> myServices;

    public String getAllNamesOfServices() {
        return myServices.stream().map(MyService::getName).collect(Collectors.joining(","));
    }
}
