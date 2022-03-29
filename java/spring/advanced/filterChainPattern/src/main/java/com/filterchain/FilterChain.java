package com.filterchain;

public interface FilterChain {
    void addFilter(Filter filter);
    void doFilter(String request, String response);
}
