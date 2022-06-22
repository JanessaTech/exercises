package com.service.impl;

import com.service.MyService;

public class MyServiceImpl implements MyService {
    @Override
    public String execute(String say) {
        return "Hello, " + say;
    }
}
