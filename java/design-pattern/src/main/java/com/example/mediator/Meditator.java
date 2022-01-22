package com.example.mediator;

public interface Meditator {
    void registerBuyer(Customer buyer);
    void registerSeller(Customer seller);
    void relay(Customer from, String ad);
}
