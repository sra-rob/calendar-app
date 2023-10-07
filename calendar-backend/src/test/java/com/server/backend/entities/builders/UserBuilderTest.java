package com.server.backend.entities.builders;

import com.server.backend.entities.User;
import org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserBuilderTest {
    private UserBuilder userBuilder;
    private User user;
    @BeforeEach
    void setup() {
        userBuilder = new UserBuilder();
    }
    @Test
    public void UserBuilder_WithValidInputs_ReturnsUser() {
        Long id = 1L;
        String username = "user";
        String password = "pass";
        User user = userBuilder
                .setId(1L)
                .setUsername(username)
                .setPassword(password)
                .build();
        assertEquals(user.getClass(), User.class);
        assertEquals(user.getId(), id);
        assertEquals(user.getUsername(), username);
        assertEquals(user.getPassword(), password);
    }
    @Test
    public void UserBuilder_WithNullUsername_ReturnsNull() {
        Long id = 1L;
        String username = null;
        String password = "pass";
        User user = userBuilder
                .setId(id)
                .setUsername(username)
                .setPassword(password)
                .build();
        assertNull(user);
    }
    @Test
    public void UserBuilder_WithNullPassword_ReturnsNull() {
        Long id = 1L;
        String username = "user";
        String password = null;
        User user = userBuilder
                .setId(id)
                .setUsername(username)
                .setPassword(password)
                .build();
        assertNull(user);
    }
}
