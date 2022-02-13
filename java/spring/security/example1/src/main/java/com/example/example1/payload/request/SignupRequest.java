package com.example.example1.payload.request;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String password;
    private String role;
}
