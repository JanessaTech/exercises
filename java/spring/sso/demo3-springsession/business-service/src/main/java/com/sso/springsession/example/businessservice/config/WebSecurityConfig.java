package com.sso.springsession.example.businessservice.config;

import com.sso.springsession.example.businessservice.filter.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity(debug = false)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private AuthTokenFilter authTokenFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/business/test1").hasRole("USER")
                .antMatchers("/api/business/test2").hasRole("ADMIN")
                .antMatchers("/api/business/test3").hasAnyRole("USER", "ADMIN");

        http.addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter .class);
    }

}
