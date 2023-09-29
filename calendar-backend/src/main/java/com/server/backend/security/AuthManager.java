package com.server.backend.security;

import com.server.backend.security.providers.UserPassAuthProv;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class AuthManager implements AuthenticationManager {
    private final UserPassAuthProv userPassAuthProv;
    public AuthManager(UserPassAuthProv userPassAuthProv) {
        this.userPassAuthProv = userPassAuthProv;
    }
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if(userPassAuthProv.supports(authentication.getClass())) {
            return userPassAuthProv.authenticate(authentication);
        }
        throw new BadCredentialsException("Bad credentials");
    }
}
