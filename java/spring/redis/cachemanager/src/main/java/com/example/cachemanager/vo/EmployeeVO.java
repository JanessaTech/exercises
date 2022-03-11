package com.example.cachemanager.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class EmployeeVO implements Serializable {
    Long id;
    String name;
    Integer age;
}
