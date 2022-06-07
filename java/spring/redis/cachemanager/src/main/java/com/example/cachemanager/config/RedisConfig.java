package com.example.cachemanager.config;

import com.example.cachemanager.model.Employee;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.*;

import java.time.Duration;

@Configuration
@EnableCaching
public class RedisConfig extends CachingConfigurerSupport {
/*
    @Bean(name="stringEmployeeRedisTemplate")
    public RedisTemplate<String, Employee> stringEmployeeRedisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Employee> stringEmployeeRedisTemplate = new RedisTemplate<>();

        RedisSerializer<String> keySerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Employee.class);

        stringEmployeeRedisTemplate.setConnectionFactory(factory);
        stringEmployeeRedisTemplate.setKeySerializer(keySerializer);
        stringEmployeeRedisTemplate.setValueSerializer(jackson2JsonRedisSerializer);

        return stringEmployeeRedisTemplate;
    }*/

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory redisConnectionFactory) {

        //初始化一个RedisCacheWriter
        RedisCacheWriter redisCacheWriter = RedisCacheWriter.nonLockingRedisCacheWriter(redisConnectionFactory);
        //设置CacheManager的值序列化方式为json序列化
        RedisSerializer<Object> jsonSerializer = new GenericJackson2JsonRedisSerializer();
        RedisSerializationContext.SerializationPair<Object> pair = RedisSerializationContext.SerializationPair.fromSerializer(jsonSerializer);
        RedisCacheConfiguration defaultCacheConfig = RedisCacheConfiguration.defaultCacheConfig().serializeValuesWith(pair);

        //设置默认超过时期
        defaultCacheConfig.entryTtl(Duration.ofMinutes(1));
        //初始化RedisCacheManager
        return new RedisCacheManager(redisCacheWriter, defaultCacheConfig);
    }



}
