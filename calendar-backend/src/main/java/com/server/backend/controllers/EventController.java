package com.server.backend.controllers;

import com.server.backend.entities.Event;
import com.server.backend.entities.dtos.EventDto;
import com.server.backend.services.EventService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/v1/event")

public class EventController {
    private final EventService eventService;
    private final HttpSession session;
    public EventController(EventService eventService, HttpSession session) {
        this.session = session;
        this.eventService = eventService;
    }

    @GetMapping("{intervalStart}/{intervalEnd}")
    public List<Event> findByInterval(
            @PathVariable LocalDate intervalStart,
            @PathVariable LocalDate intervalEnd
    ) {
        return eventService.findByInterval(intervalStart, intervalEnd);
    }
    @PostMapping
    public EventDto create(@RequestBody EventDto event) {
        EventDto res = eventService.create(event);
        return res;
    }
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        eventService.delete(id);
    }
    @PutMapping
    public EventDto update(@RequestBody EventDto event) {
        EventDto res = eventService.update(event);
        return res;
    }
}