package com.security.example.mfa.service;

import org.springframework.stereotype.Service;

@Service
public class MFAServiceImpl implements MFAService {
    @Override
    public boolean verify(String params) {
        return false;
    }
}
