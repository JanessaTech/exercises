package com.example.customfilterinspringsecurity.config;

import com.example.customfilterinspringsecurity.filter.Custom2Filter;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity(debug = false)
@Order(SecurityProperties.BASIC_AUTH_ORDER - 200)
public class Custom2WebSecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/match2/**").addFilterAfter(
                new Custom2Filter(), BasicAuthenticationFilter.class);
    }
}
