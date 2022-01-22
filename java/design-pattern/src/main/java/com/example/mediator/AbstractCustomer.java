package com.example.mediator;

public abstract class AbstractCustomer implements Customer{
    protected String name;
    protected Meditator realEstator;
    AbstractCustomer(String name) {
        this.name = name;
    }

    public void setRealEstator(Meditator realEstator) {
        this.realEstator = realEstator;
    }
    @Override
    public String getName() {
        return this.name;
    }
    @Override
    public void send(String ad) {
        this.realEstator.relay(this, ad);
    }

    @Override
    public void receive(String from, String ad) {
        System.out.println(String.format("%s received ad -> %s said %s", this.getName(), from, ad));
    }
}
