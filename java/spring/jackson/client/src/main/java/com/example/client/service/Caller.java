package com.example.client.service;

import com.example.client.dto.PlayerVouchersResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Caller {
    @Autowired
    private RestTemplate restTemplate;

    public PlayerVouchersResponse call(){
        PlayerVouchersResponse response =  restTemplate.getForObject("http://127.0.0.1:8081/demo", PlayerVouchersResponse.class);
        return response;
    }
}
