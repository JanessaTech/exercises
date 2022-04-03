package com.example.authticationservice.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class JwtReturn implements Serializable {
    private String username;
    private String token;
    private List<ROLE> roles;
    public JwtReturn(String username, String token, List<ROLE> roles) {
        this.username = username;
        this.token  = token;
        this.roles = roles;
    }
}
