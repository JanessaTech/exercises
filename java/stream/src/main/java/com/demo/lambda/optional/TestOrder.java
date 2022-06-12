package com.demo.lambda.optional;

import java.util.Optional;

public class TestOrder {
    public static Optional<Order> getOrder() {
        Order order = new Order();
        IsoCode isoCode = new IsoCode(123);
        Country country = new Country();
        country.setIsoCode(Optional.ofNullable(isoCode));
        Address address = new Address();
        address.setCountry(Optional.ofNullable(country));
        Logistics logistics = new Logistics();
        logistics.setAddress(Optional.ofNullable(address));
        order.setLogistics(Optional.ofNullable(logistics));
        return Optional.ofNullable(order);
    }

    public static void main(String[] args) {
        Optional<Order> order = getOrder();

        Integer  number = order.flatMap(Order::getLogistics)
             .flatMap(Logistics::getAddress)
             .flatMap(Address::getCountry)
             .flatMap(Country::getIsoCode)
             .map(IsoCode::getNumber)
             .orElse(0);
        System.out.println(number);


    }
}
