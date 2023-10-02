package com.server.backend.services;

import com.server.backend.entities.User;
import com.server.backend.entities.dtos.UserDto;
import com.server.backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;
    public UserService(
            UserRepository userRepository,
            ModelMapper mapper,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }
    public UserDto register(UserDto u) {
        User user = mapper.map(u, User.class);
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );
        userRepository.save(user);
        return u;
    }
}
