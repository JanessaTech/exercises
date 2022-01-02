package com.example.injection.list;

import com.example.injection.MyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListInjectionDemo {

    @Autowired
    private List<MyService> myServices;

    String getAllNamesOfServices() {
        return myServices.stream().map(MyService::getName).collect(Collectors.joining(","));
    }
}
