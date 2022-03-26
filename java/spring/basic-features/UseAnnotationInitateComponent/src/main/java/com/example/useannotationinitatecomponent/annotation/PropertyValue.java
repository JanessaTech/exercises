package com.example.useannotationinitatecomponent.annotation;

import java.lang.annotation.*;


@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(PropertyValueContainer.class)
public @interface PropertyValue {
    String name() default "Jane";
    int age() default 0;
    boolean flag() default true;
}
