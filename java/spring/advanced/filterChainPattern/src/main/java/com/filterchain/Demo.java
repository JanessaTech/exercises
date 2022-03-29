package com.filterchain;

public class Demo {
    public static void main(String[] args) {
        FilterChain chain = new FilterChainImpl();
        chain.addFilter(new ConcreteFilter("filter1"));
        chain.addFilter(new ConcreteFilter("filter2"));
        chain.addFilter(new ConcreteFilter("filter3"));

        chain.doFilter("My request", "My response");
    }
}
