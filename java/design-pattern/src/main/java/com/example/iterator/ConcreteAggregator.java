package com.example.iterator;

import java.util.ArrayList;
import java.util.List;

public class ConcreteAggregator<T> implements Aggregator<T> {
    private List<T> list = new ArrayList<>();
    @Override
    public void add(T e) {
        list.add(e);
    }

    @Override
    public void remove(T e) {
        list.remove(e);
    }

    @Override
    public Iterator getIterator() {
        return new ConcreteIterator(this.list);
    }
}
