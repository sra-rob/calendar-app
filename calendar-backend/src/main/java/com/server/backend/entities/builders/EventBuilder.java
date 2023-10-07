package com.server.backend.entities.builders;

import com.server.backend.entities.Event;
import com.server.backend.entities.User;

import java.time.LocalDate;
import java.time.LocalTime;

public class EventBuilder {
    private Long id;
    private String title;
    private LocalDate startDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private User user;
    public EventBuilder setId(Long id) {
        this.id = id;
        return this;
    }

    public EventBuilder setTitle(String title) {
        this.title = title;
        return this;
    }

    public EventBuilder setStartDate(LocalDate startDate) {
        this.startDate = startDate;
        return this;
    }

    public EventBuilder setStartTime(LocalTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public EventBuilder setEndTime(LocalTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public EventBuilder setUser(User user) {
        this.user = user;
        return this;
    }
    public Event build() {
        if(title == null || startDate == null || user == null) return null;
        return new Event(id, title, startDate, startTime, endTime, user);
    }
}

// this.id = id;
// this.title = title;
// this.startDate = startDate;
// this.startTime = startTime;
// this.endTime = endTime;
// this.user = user;