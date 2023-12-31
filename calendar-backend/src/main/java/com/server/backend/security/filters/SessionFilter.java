package com.server.backend.security.filters;

import com.server.backend.security.authentications.SessionAuth;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Enumeration;

public class SessionFilter extends OncePerRequestFilter {
    private final HttpSession session;
    public SessionFilter(HttpSession session) {
        this.session = session;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(!request.getRequestURI().equals("/api/v1/auth/login")) {
            String username = (String) session.getAttribute("username");
            if (username != null) {
                SessionAuth auth = new SessionAuth(username, true);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
            filterChain.doFilter(request, response);
        }
    }
}
