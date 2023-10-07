package com.server.backend.security.filters;

import com.server.backend.security.authentications.SessionAuth;
import jakarta.persistence.Enumerated;
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
        if(!request.getRequestURI().equals("/auth/login")) {
            String username = (String) session.getAttribute("username");
            Enumeration<String> sessionNames = session.getAttributeNames();
            while(sessionNames.hasMoreElements()) {
                System.out.println(sessionNames.nextElement());
            }
            if (username != null) {
                System.out.println("USERNAME IS NOT NULL");
                System.out.println("SESSION AUTH");
                SessionAuth auth = new SessionAuth(username, true);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else System.out.println("USERNAME IS NULL");
            filterChain.doFilter(request, response);
        }
    }
}
