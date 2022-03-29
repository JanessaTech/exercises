package com.filterchain;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ConcreteFilter implements Filter{
    private String filterName;
    public ConcreteFilter(String filterName) {
        this.filterName  = filterName;
    }
    @Override
    public String getName() {
        return this.filterName;
    }

    @Override
    public void filterInternal(String request, String response, FilterChain filterChain) {
        log.info("executing in filter {}", filterName);
        filterChain.doFilter(request, response);
    }
}
