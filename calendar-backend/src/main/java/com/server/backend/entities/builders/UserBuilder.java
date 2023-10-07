package com.server.backend.entities.builders;

import com.server.backend.entities.User;

public class UserBuilder {
    private Long id;
    private String username;
    private String password;
    public UserBuilder setId(Long id) {
        this.id = id;
        return this;
    }

    public UserBuilder setUsername(String username) {
        this.username = username;
        return this;
    }

    public UserBuilder setPassword(String password) {
        this.password = password;
        return this;
    }
    public User build() {
        if(username == null || password == null) return null;
        return new User(id, username, password);
    }
}
