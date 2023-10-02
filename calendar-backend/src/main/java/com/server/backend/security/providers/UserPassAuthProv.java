package com.server.backend.security.providers;

import com.server.backend.security.SecurityUser;
import com.server.backend.security.authentications.UserPassAuth;
import com.server.backend.security.services.UserPassUserDetailsService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserPassAuthProv implements AuthenticationProvider {
    private final PasswordEncoder passwordEncoder;
    private final UserPassUserDetailsService userDetailsService;
    public UserPassAuthProv(PasswordEncoder passwordEncoder, UserPassUserDetailsService userDetailsService) {
        this.passwordEncoder = passwordEncoder;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UserPassAuth auth = (UserPassAuth) authentication;
        String username = auth.getName();
        String password = auth.getPassword();
        SecurityUser securityUser = (SecurityUser) userDetailsService.loadUserByUsername(username);
        if(passwordEncoder.matches(password, securityUser.getPassword())) {
            return new UserPassAuth(username, password, true);
        } else {
            return authentication;
        }
     }

    @Override
    public boolean supports(Class<?> authentication) {
        return UserPassAuth.class.equals(authentication);
    }
}
