package com.sso.example.authenticationservice.controller;

import com.sso.example.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/auth")
public class AuthController {

    @Value("${jannessa.app.jwtSecret}")
    private String jwtSecret;
    @Value("${jannessa.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Autowired
    AuthenticationManager authenticationManager;

    @GetMapping("/login")
    public String authenticate(@RequestParam(name = "userName", required = true) String userName,
                               @RequestParam(name = "password", required = true) String password) {
        String token = "";
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userName, password));
            token = JwtUtils.generateJwtToken(userName, authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()), jwtSecret, jwtExpirationMs);
        } catch (Exception ex) {
            ex.printStackTrace();
            return "error";
        }
        return token;
    }
}
