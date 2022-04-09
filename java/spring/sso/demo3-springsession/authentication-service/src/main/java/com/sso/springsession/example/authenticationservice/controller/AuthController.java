package com.sso.springsession.example.authenticationservice.controller;

import com.sso.springsession.example.authenticationservice.service.UserService;
import com.sso.springsession.example.authenticationservice.vo.UserVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    PasswordEncoder encoder;


    @PostMapping("/register")
    public ResponseEntity<?>  registerUser(@RequestBody UserVo userVo) throws Exception {
        if(userService.existsByName(userVo.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        userVo.setPassword(encoder.encode(userVo.getPassword()));
        userService.create(userVo);

        return ResponseEntity.ok("User registered successfully!");
    }


    @GetMapping("/login")
    public String login(@RequestParam(name = "username", required = true) String username,
                                   @RequestParam(name = "password", required = true) String password,
                                   HttpServletRequest request) {

        log.info("In AuthController, sessionid = {}", request.getSession().getId());

        Authentication authentication = (Authentication)request.getSession().getAttribute("authentication");
        if (authentication != null) {
            return "already logined";
        } else {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            request.getSession().setAttribute("authentication",authentication);
            return "login successfully";
        }
    }


    @GetMapping(value = "/logout")
    public String logout(HttpServletRequest request,
                         @RequestParam(name = "username", required = true) String username
    ) {
        Authentication authentication = (Authentication)request.getSession().getAttribute("authentication");
        if (authentication != null) {
            request.getSession().removeAttribute("authentication");
            return username + " logout successfully";
        }
        return "You need to login first";
    }
}
