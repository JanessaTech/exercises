package com.base;

public abstract class AbstractOperation<T> implements BaseOperation<T> {
    public String op(T input) {

        return input.toString();
    }
}
