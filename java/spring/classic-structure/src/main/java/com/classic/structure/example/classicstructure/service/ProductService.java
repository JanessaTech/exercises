package com.classic.structure.example.classicstructure.service;

import com.classic.structure.example.classicstructure.dao.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAll();
    Product get(Long id);
    Product create(Product product);
    Product update(Product product);
    void delete(Long id);
}
