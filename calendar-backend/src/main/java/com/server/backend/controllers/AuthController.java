package com.server.backend.controllers;

import com.server.backend.entities.dtos.UserDto;
import com.server.backend.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")

public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("login")
    public void login() {}
    @PostMapping("logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
    @PostMapping("user")
    public boolean user(HttpSession session) {
        String username = (String) session.getAttribute("username");
        return username == null ? false : true;
    }
    @PostMapping("register")
    public UserDto register(@RequestBody UserDto user) {
        System.out.println("REGISTERING");
        System.out.println(user);
        return userService.register(user);
    }
    @GetMapping("csrf")
    public String csrf(CsrfToken csrfToken) {
        return csrfToken.getToken();
    }
}
