package com.springcloud.feign.example.feignclient.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(value = "mybusiness", url = "http://127.0.0.1:8081/", fallback = MyBusinessClientFallBack.class)
public interface MyBusinessClient {
    @GetMapping(value = "/business/hello")
    String helloworld();
    @GetMapping(value = "/business/timeout")
    String timeout();
}


