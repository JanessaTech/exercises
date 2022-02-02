package com.example.h2.service;

import com.example.h2.model.Country;
import com.example.h2.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryServiceImpl implements CountryService {
    @Autowired
    private CountryRepository countryRepository;
    @Override
    public List<Country> getAll() {
        return countryRepository.findAll();
    }

    @Override
    public Country addCountry(Country country) {
        Country country1 = countryRepository.save(country);
        return country1;
    }
}
