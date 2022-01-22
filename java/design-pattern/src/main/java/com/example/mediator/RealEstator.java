package com.example.mediator;

import java.util.ArrayList;
import java.util.List;

public class RealEstator implements Meditator{
    private List<Customer> buyers = new ArrayList<>();
    private List<Customer> sellers = new ArrayList<>();

    @Override
    public void registerBuyer(Customer buyer) {
        buyers.add(buyer);
        buyer.setRealEstator(this);
    }

    @Override
    public void registerSeller(Customer seller) {
        sellers.add(seller);
        seller.setRealEstator(this);
    }

    @Override
    public void relay(Customer from, String ad) {
        if (from instanceof Buyer) {
            for( Customer seller : sellers) {
                seller.receive("Buyer " + from.getName(), ad);
            }
        } else {
            for(Customer buyer : buyers) {
                buyer.receive("Seller " + from.getName(), ad);
            }
        }
    }
}
