package com.example.h2.controller;

import com.example.h2.model.Country;
import com.example.h2.service.CountryService;
import com.example.h2.vo.CountryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/countries")
public class CountryController {
    @Autowired
    CountryService countryService;

    @GetMapping
    public ResponseEntity<List<CountryVO>> getAll() {

        List<Country> countries = countryService.getAll();
        List<CountryVO> countryVOS = convert2VOs(countries);
        return new ResponseEntity(countryVOS, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CountryVO> create(@RequestBody CountryVO countryVO) {
        Country country = convert2DO(countryVO);
        country = countryService.addCountry(country);
        CountryVO countryVO1 = convert2VO(country);
        return new ResponseEntity<>(countryVO1, HttpStatus.OK);
    }

    private Country convert2DO(CountryVO countryVO) {
        Country country = new Country();
        country.setId(countryVO.getId());
        country.setName(countryVO.getName());
        return country;
    }

    private CountryVO convert2VO(Country country) {
        CountryVO countryVO = new CountryVO();
        countryVO.setId(country.getId());
        countryVO.setName(country.getName());
        return countryVO;
    }

    private List<CountryVO> convert2VOs(List<Country> countries) {
        return countries.stream().map(x -> convert2VO(x)).collect(Collectors.toList());
    }
}
