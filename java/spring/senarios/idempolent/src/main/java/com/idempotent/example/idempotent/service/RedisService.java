package com.idempotent.example.idempotent.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.data.redis.core.script.RedisScript;
import org.springframework.stereotype.Service;

import java.util.List;

public interface RedisService {
    void put(String key, String value);
    void remove(String key);
    boolean exists(String key);
    Long execute(List<String> params);
}

@Service
class RedisServiceImpl implements RedisService {
    @Autowired
    RedisTemplate<String, Object> redisTemplate;

    String script = "if redis.call('get', KEYS[1]) == KEYS[2] then return redis.call('del', KEYS[1]) else return 0 end";
    RedisScript<Long> redisScript = new DefaultRedisScript<>(script, Long.class);

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

    @Override
    public Long execute(List<String> params) {
        RedisScript<Long> redisScript = getRedisScript();
        Long result = redisTemplate.execute(redisScript, params);
        return result;
    }

    private RedisScript<Long> getRedisScript() {
        String script = "if redis.call('EXISTS', KEYS[1]) == 1 then return redis.call('del', KEYS[1]) else return 0 end";
        RedisScript<Long> redisScript = new DefaultRedisScript<>(script, Long.class);
        return redisScript;
    }
}
