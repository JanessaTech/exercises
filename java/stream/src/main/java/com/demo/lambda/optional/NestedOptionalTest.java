package com.demo.lambda.optional;

import java.util.Optional;

public class NestedOptionalTest {
    public static Car getCar() {
        Insurance insurance = new Insurance("xxxx");
        Car car = new Car();
        car.setInsurance(Optional.ofNullable(insurance));
        return car;
    }

    public static void main(String[] args) {
        Car car = getCar();
        String insuranceName = Optional.of(car)
                .flatMap(Car::getInsurance)  // only one optional being shell of the core value
                .map(Insurance::getName).orElse("yyy");
        System.out.println(insuranceName);
    }
}
