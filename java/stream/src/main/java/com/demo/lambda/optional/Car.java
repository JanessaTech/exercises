package com.demo.lambda.optional;

import lombok.Data;

import java.util.Optional;

@Data
public class Car {
    private Optional<Insurance> insurance;
}
@Data
class Insurance {
    public Insurance(String name) {
        this.name = name;
    }
    private String name;
}
