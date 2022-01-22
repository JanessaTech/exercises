package com.example.mediator;

public interface Customer {
    String getName();
    void setRealEstator(Meditator realEstator);
    void send(String ad);
    void receive(String from, String ad);
}
