package com.server.backend.entities.builders;

import com.server.backend.entities.Event;
import com.server.backend.entities.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalTime;
import static org.junit.jupiter.api.Assertions.*;

public class EventBuilderTest {
    private EventBuilder eventBuilder;
    @BeforeEach
    void setUp() {
        eventBuilder = new EventBuilder();
    }
    @Test
    public void EventBuilder_WithValidInputs_ReturnsEvent() {
        User user = new UserBuilder()
                .setId(1L)
                .setUsername("user")
                .setPassword("pass")
                .build();
        Long id = 1L;
        String title = "title";
        LocalDate startDate = LocalDate.now();
        LocalTime startTime = LocalTime.now();
        LocalTime endTime = LocalTime.now();
        Event event = eventBuilder
                .setId(id)
                .setTitle(title)
                .setStartDate(startDate)
                .setStartTime(startTime)
                .setEndTime(endTime)
                .setUser(user)
                .build();
        assertEquals(event.getClass(), Event.class);
        assertEquals(event.getId(), id);
        assertEquals(event.getStartDate(), startDate);
        assertEquals(event.getStartTime(), startTime);
        assertEquals(event.getEndTime(), endTime);
        assertEquals(event.getUser(), user);
    }
    @Test
    void EventBuilder_WithNullTitle_ReturnsNull() {
        User user = new UserBuilder()
                .setId(1L)
                .setUsername("username")
                .setPassword("pass")
                .build();
        String title = null;
        LocalDate startDate = LocalDate.now();
        Event event = eventBuilder
                .setTitle(title)
                .setStartDate(startDate)
                .setUser(user)
                .build();
        assertNull(event);
    }
    @Test
    void EventBuilder_WithNullStartDate_ReturnsNull() {
        User user = new UserBuilder()
                .setId(1L)
                .setUsername("username")
                .setPassword("pass")
                .build();
        String title = "title";
        LocalDate startDate = null;
        Event event = eventBuilder
                .setTitle(title)
                .setStartDate(startDate)
                .setUser(user)
                .build();
        assertNull(event);
    }
    @Test
    void EventBuilder_WithNullUser_ReturnsNull() {
        User user = null;
        String title = "title";
        LocalDate startDate = LocalDate.now();
        Event event = eventBuilder
                .setTitle(title)
                .setStartDate(startDate)
                .setUser(user)
                .build();
        assertNull(event);
    }
}
