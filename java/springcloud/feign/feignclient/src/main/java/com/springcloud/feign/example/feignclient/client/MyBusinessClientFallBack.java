package com.springcloud.feign.example.feignclient.client;

import org.springframework.stereotype.Component;

@Component
class MyBusinessClientFallBack implements MyBusinessClient {
    @Override
    public String helloworld() {
        return "hello world! fall back!";
    }

    @Override
    public String timeout() {
        return "hello world! timeout!";
    }
}
