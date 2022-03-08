package com.example.springdataredis.model;

import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("Student")
public class Student implements Serializable {
    private String id;
    private String name;
    private int grade;
}
