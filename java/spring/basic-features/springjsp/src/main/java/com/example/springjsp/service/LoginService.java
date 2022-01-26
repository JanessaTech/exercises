package com.example.springjsp.service;

import org.springframework.stereotype.Service;

@Service
public class LoginService {
    public boolean validateUser(String userid, String password) {
        // admin/admin
        return userid.equalsIgnoreCase("admin")
                && password.equalsIgnoreCase("admin");
    }
}
