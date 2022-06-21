package com.classic.structure.example.classicstructure.service.impl;

import com.classic.structure.example.classicstructure.dao.Product;
import com.classic.structure.example.classicstructure.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {
    private static Long index = 0L;

    private Map<Long, Product> map = new HashMap<>();

    @Override
    public List<Product> getAll() {
        return new ArrayList<>(map.values());
    }

    @Override
    public Product get(Long id) {
        return map.getOrDefault(id, null);
    }

    @Override
    public Product create(Product product) {
        product.setId(index++);
        map.put(product.getId(), product);
        return product;
    }

    @Override
    public Product update(Product product) {
        map.put(product.getId(), product);
        return product;
    }

    @Override
    public void delete(Long id) {
        map.remove(id);
    }
}
