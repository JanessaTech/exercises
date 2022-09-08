package com.security.example.mfa.controller;

import com.security.example.mfa.service.UserService;
import com.security.example.mfa.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/demo")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/users")
    public List<UserVo> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public UserVo getUser(@PathVariable(value = "id", required = true) Long id) {
        return userService.get(id);
    }

    @PostMapping("/users")
    public UserVo createUser(@RequestBody UserVo userVo) throws Exception {
        userVo.setPassword(encoder.encode(userVo.getPassword()));
        return userService.create(userVo);

    }
}