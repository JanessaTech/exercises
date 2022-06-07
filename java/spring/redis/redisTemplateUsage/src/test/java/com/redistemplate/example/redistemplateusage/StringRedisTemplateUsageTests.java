package com.redistemplate.example.redistemplateusage;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.util.Assert;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@SpringBootTest
public class StringRedisTemplateUsageTests {
   // redisTemplate.opsForValue(); //操作字符串
   // redisTemplate.opsForHash(); //操作hash
   // redisTemplate.opsForList(); //操作list
   // redisTemplate.opsForSet(); //操作set
   // redisTemplate.opsForZSet(); //操作有序zset
    @Autowired
   RedisTemplate redisTemplate;

    @Test
    public void opsForValue() {
        deleteKey("key1");
        redisTemplate.opsForValue().set("key1", "value");
        Assert.isTrue(redisTemplate.hasKey("key1"), "key1 doesn't exist");
        redisTemplate.delete("key1");
        Assert.isTrue(!redisTemplate.hasKey("key1"), "Failed to delete key1");
    }

    @Test void opsForHash() {
        Map<String, String> map  = new HashMap<>();
        deleteKey("map1");

        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");
        redisTemplate.opsForHash().putAll("map1", map);

        String value = (String) redisTemplate.opsForHash().get("map1", "key1");
        Assert.isTrue(value.equals("value1"), "cannot get value");
        boolean haskey = redisTemplate.opsForHash().hasKey("map1", "key2");
        Assert.isTrue(haskey, "keys doesn't exist in map1");
        Set<String> keys = redisTemplate.opsForHash().keys("map1");
        System.out.println(keys);
        List<String> values = redisTemplate.opsForHash().values("map1");
        System.out.println(keys);
    }

    @Test void opsForSet() {
        SetOperations<String, String> set = redisTemplate.opsForSet();
        deleteKey("setkey");
        set.add("setkey", "value1");
        set.add("setkey", "value2");
        set.add("setkey", "value3");

        Set<String> resultSet = redisTemplate.opsForSet().members("setkey");
        System.out.println("resultSet:" + resultSet);
    }

    @Test void opsForList() {
        deleteKey("listkey");
        ListOperations<String, String> list = redisTemplate.opsForList();
        list.leftPush("listkey", "value1");
        list.leftPush("listkey", "value2");
        list.leftPush("listkey", "value3");
        list.rightPush("listkey", "value0");
        List<String> res = list.range("listkey", 0, 10);
        System.out.println(res);
    }

    private void deleteKey(String key) {
        if (redisTemplate.hasKey(key)) {
            redisTemplate.delete(key);
        }
    }
}
