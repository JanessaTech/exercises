package com.example.h2.service;

import com.example.h2.model.Country;

import java.util.List;

public interface CountryService {
    List<Country> getAll();
    Country addCountry(Country country);
}
