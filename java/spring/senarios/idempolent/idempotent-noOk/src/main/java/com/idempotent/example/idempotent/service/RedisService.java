package com.idempotent.example.idempotent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

public interface RedisService {
    void put(String key, String value);
    void remove(String key);
    boolean exists(String key);
}

@Service
class RedisServiceImpl implements RedisService {
    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    @Override
    public void put(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    @Override
    public void remove(String key) {
        redisTemplate.delete(key);
    }

    @Override
    public boolean exists(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
}
