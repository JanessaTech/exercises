package com.classic.structure.example.classicstructure.dao;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Product {
    private Long id;
    private String name;
    private BigDecimal price;
    private Integer status;
}
