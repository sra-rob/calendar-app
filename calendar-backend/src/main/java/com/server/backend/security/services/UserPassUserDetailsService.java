package com.server.backend.security.services;

import com.server.backend.entities.User;
import com.server.backend.repositories.UserRepository;
import com.server.backend.security.SecurityUser;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserPassUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    public UserPassUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException());
        SecurityUser securityUser = new SecurityUser(user);
        return securityUser;
    }
}
