package com.example.useannotationinitatecomponent.annotation;


import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Repeatable(FooContainer.class)
public @interface Foo {

    String value();
}
