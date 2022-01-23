package com.example.useannotationinitatecomponent;


import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Repeatable(FooContainer.class)
public @interface Foo {

    String value();
}
