package com.demo.lambda.optional;

import lombok.Data;

import java.util.Optional;

@Data
public class Order {
    private Optional<Logistics> logistics;
}

@Data
class Logistics {
    private Optional<Address> address;
}

@Data
class Address {
    private Optional<Country> country;
}

@Data
class Country {
    private Optional<IsoCode> isoCode;
}

@Data
class IsoCode {
    IsoCode(){}
    IsoCode(Integer number) {this.number = number;}
    private Integer number;
}
