package com.demo.security.login.session.singleloginsession.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class LoginLogoutController {

    @GetMapping(value = "/login")
    public String login(HttpServletRequest request,
                          @RequestParam(name = "username", required = true) String username,
                          @RequestParam(name = "password", required = true) String password) {
        String loginUserName= (String) request.getSession().getAttribute("user");
        if (loginUserName != null && loginUserName.equals(username)) {
            return "already logined";
        } else {
            if (username.equals("admin") && password.equals("12345")) {
                request.getSession().setAttribute("user", username);
                return "login success";
            } else {
                return "username or password are wrong";
            }
        }
    }

    @GetMapping(value = "/logout")
    public String login(HttpServletRequest request,
                        @RequestParam(name = "username", required = true) String username
                        ) {
        String loginUserName= (String) request.getSession().getAttribute("user");
        if (loginUserName != null && loginUserName.equals(username)) {
            request.getSession().removeAttribute("user");
            return "logout successfully";
        }
        return "You need to login first";
    }
}
