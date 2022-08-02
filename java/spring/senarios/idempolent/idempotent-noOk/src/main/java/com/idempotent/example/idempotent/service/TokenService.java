package com.idempotent.example.idempotent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

public interface TokenService {
    String getToken();
}

@Service
class TokenServiceImpl implements TokenService {
    @Autowired RedisService redisService;

    @Override
    public String getToken() {
        String token = UUID.randomUUID().toString();
        redisService.put(token, token);
        return token;
    }
}
