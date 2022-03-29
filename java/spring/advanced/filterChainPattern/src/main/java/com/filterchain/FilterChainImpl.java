package com.filterchain;

import java.util.ArrayList;
import java.util.List;

public class FilterChainImpl implements FilterChain{
    private int currentPosition = 0;
    private List<Filter> filters = new ArrayList<>();

    @Override
    public void addFilter(Filter filter) {
        filters.add(filter);
    }

    @Override
    public void doFilter(String request, String response) {
        if (currentPosition < filters.size()) {
            Filter nextFilter = filters.get(currentPosition);
            currentPosition++;
            nextFilter.filterInternal(request, response, this);
        }

    }
}
