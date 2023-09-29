package com.server.backend.security.authentications;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

public class UserPassAuth implements Authentication {
    private final String username;
    private final String password;
    private final boolean authenticated;
    public UserPassAuth(String username, String password, boolean authenticated) {
        this.username = username;
        this.password = password;
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

    public String getPassword() {
        return this.password;
    }

    @Override
    public String getName() {
        return this.username;
    }

    @Override
    public String toString() {
        return "UserPassAuth{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", authenticated=" + authenticated +
                '}';
    }
}
