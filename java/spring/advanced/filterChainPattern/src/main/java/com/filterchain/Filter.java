package com.filterchain;

public interface Filter {
    String getName();
    void filterInternal(String request, String response, FilterChain filterChain);
}
