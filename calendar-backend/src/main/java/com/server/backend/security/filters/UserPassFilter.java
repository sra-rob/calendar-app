package com.server.backend.security.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.backend.entities.dtos.UserDto;
import com.server.backend.security.AuthManager;
import com.server.backend.security.authentications.UserPassAuth;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class UserPassFilter extends OncePerRequestFilter {
    private final AuthManager authManager;
    private final ObjectMapper objectMapper;
    public UserPassFilter(AuthManager authManager, ObjectMapper objectMapper) {
        this.authManager = authManager;
        this.objectMapper = objectMapper;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getRequestURI().equals("/api/v1/auth/login")) {
            UserDto unAuthedUser = objectMapper.readValue(request.getInputStream(), UserDto.class);
            String username = unAuthedUser.getUsername();
            String password = unAuthedUser.getPassword();
            UserPassAuth authentication = new UserPassAuth(username, password, false);
            UserPassAuth auth = (UserPassAuth) authManager.authenticate(authentication);
            if(auth.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(auth);
                request.getSession().setAttribute("username", username);
            } else {
                filterChain.doFilter(request, response);
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
