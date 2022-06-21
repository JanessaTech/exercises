package com.classic.structure.example.classicstructure.controller;

import com.classic.structure.example.classicstructure.dao.Product;
import com.classic.structure.example.classicstructure.service.ProductService;
import com.classic.structure.example.classicstructure.vo.ProductVo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@Validated
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping
    ProductVo create(@RequestBody @Validated ProductVo productVo) {
        Product product = new Product();
        BeanUtils.copyProperties(productVo, product);
        Product saved = productService.create(product);
        BeanUtils.copyProperties(saved, productVo);
        return productVo;
    }
}
