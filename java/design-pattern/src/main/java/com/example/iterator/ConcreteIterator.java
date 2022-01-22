package com.example.iterator;

import java.util.ArrayList;
import java.util.List;

public class ConcreteIterator<T> implements Iterator<T>{
    private List<T> list = new ArrayList<>();

    int cur = 0;

    ConcreteIterator(List<T> list) {
        this.list  = list;
    }

    @Override
    public boolean hasNext() {
        if (this.list == null || cur >= list.size()) return false;
        return true;
    }

    @Override
    public T next() {
        return list.get(cur++);
    }
}
