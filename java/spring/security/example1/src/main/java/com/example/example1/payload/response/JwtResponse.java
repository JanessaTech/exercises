package com.example.example1.payload.response;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type;
    private Long id;
    private String username;
    private String role;

    public JwtResponse(String token, Long id, String username, String role) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.role = role;
    }
}
