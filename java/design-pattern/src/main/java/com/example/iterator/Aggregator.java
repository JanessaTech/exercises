package com.example.iterator;

public interface Aggregator<T> {
    void add(T e);
    void remove(T e);
    Iterator<T> getIterator();
}
