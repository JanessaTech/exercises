package com.sso.example.authenticationservice.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        /**
         * For simplicity, here I hardcode username,  password and role which are admin , 123456 and ADMIN
         */
        if (!Objects.equals(username, "admin")) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }

        String hardCodedPwd = "$2a$12$HznlJTkOgraMHi41i.VY3uqU9PV8gcKIpJ0/htpR3tkiBpBkZY0hO"; // The plain text is 123456
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ADMIN"));

        return org.springframework.security.core.userdetails.User.withUsername(username)
                .password(hardCodedPwd)
                .authorities(authorities).build();
    }
}
