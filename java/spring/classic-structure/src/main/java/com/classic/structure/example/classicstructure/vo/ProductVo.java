package com.classic.structure.example.classicstructure.vo;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class ProductVo {

    private Long id;
    @NotNull(message = "product name cannot be null")
    private String name;
    @Min(value = 0, message = "price cannot be negative")
    private BigDecimal price;
    private Integer status;
}
