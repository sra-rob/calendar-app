package com.server.backend.security.authentications;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class SessionAuth implements Authentication {
    private final String username;
    private final boolean authenticated;
    public SessionAuth(String username, boolean authenticated) {
        this.username=username;
        this.authenticated = authenticated;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getDetails() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }

    @Override
    public boolean isAuthenticated() {
        return this.authenticated;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

    }

    @Override
    public String getName() {
        return this.username;
    }

    @Override
    public String toString() {
        return "SessionAuth{" +
                "username='" + username + '\'' +
                '}';
    }
}
