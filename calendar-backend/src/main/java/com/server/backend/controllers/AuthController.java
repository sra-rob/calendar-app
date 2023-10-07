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
    public void login() {
        System.out.println("LOGIN ENDPOINT");
    }
    @PostMapping("logout")
    public void logout(HttpSession session) {
        System.out.println("LOGOUT ENDPOINT");
        session.invalidate();
    }
    @PostMapping("user")
    public boolean user(HttpSession session) {
        System.out.println("USER ENDPOINT");
        String username = (String) session.getAttribute("username");
        return username == null ? false : true;
    }
    @PostMapping("register")
    public UserDto register(@RequestBody UserDto user) {
        System.out.println("REGISTER ENDPOINT");
        return userService.register(user);
    }
    @GetMapping("csrf")
    public String csrf(CsrfToken csrfToken) {
        System.out.println("CSRF ENDPOINT");
        return csrfToken.getToken();
    }
}
