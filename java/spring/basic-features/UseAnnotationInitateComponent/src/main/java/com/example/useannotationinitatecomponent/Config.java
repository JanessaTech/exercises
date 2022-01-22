package com.example.useannotationinitatecomponent;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(ConfigContainer.class)
public @interface Config {
    String name() default "default_name";
    int age() default 0;
}
