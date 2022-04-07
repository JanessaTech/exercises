package com.security.db.example.defaultsecurityusingdb.controller;

import com.security.db.example.defaultsecurityusingdb.service.UserService;
import com.security.db.example.defaultsecurityusingdb.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * This class is for test purpose
 */
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
