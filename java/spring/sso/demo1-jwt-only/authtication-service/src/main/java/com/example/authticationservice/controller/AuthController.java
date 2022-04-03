package com.example.authticationservice.controller;

import com.example.authticationservice.service.UserService;
import com.example.authticationservice.util.JwtUtils;
import com.example.authticationservice.vo.JwtReturn;
import com.example.authticationservice.vo.ROLE;
import com.example.authticationservice.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam(name = "username", required = true) String username,
                                   @RequestParam(name = "password", required = true) String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());

        return ResponseEntity.ok(new JwtReturn(userDetails.getUsername(), jwt, roles.stream().map(ROLE::valueOf).collect(Collectors.toList())));
    }

    @PostMapping("/register")
    public ResponseEntity<?>  registerUser(@RequestBody UserVo userVo) throws Exception {
        if(userService.existsByName(userVo.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        userVo.setPassword(encoder.encode(userVo.getPassword()));
        userService.create(userVo);

        return ResponseEntity.ok("User registered successfully!");
    }
}
