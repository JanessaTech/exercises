package com.example.common.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String studentId;
    private String name;
    private String rollNumber;
}
