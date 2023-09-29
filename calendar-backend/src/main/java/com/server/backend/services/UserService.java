package com.server.backend.services;

import com.server.backend.entities.User;
import com.server.backend.entities.dtos.UserDto;
import com.server.backend.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper mapper;

    public UserService(UserRepository userRepository, ModelMapper mapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
    }
    public UserDto register(UserDto u) {
        User user = mapper.map(u, User.class);
        userRepository.save(user);
        return u;
    }
}
