package com.server.backend.services;

import com.server.backend.entities.Event;
import com.server.backend.entities.User;
import com.server.backend.entities.dtos.EventDto;
import com.server.backend.repositories.EventRepository;
import com.server.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;


@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final HttpSession session;
    private final ModelMapper mapper;
    public EventService(EventRepository eventRepository, UserRepository userRepository, HttpSession session, ModelMapper mapper) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.session = session;
        this.mapper = mapper;
    }
    public User getUser() {
        String username = (String) session.getAttribute("username");
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Could not find user"));
        return user;
    }
    public List<Event> findByInterval(LocalDate intervalStart, LocalDate intervalEnd) {
        User user = getUser();
        List<Event> events = eventRepository.findByInterval(intervalStart, intervalEnd, user);
        return events;
    }
    public EventDto create(EventDto e) {
        User user = getUser();
        Event event = mapper.map(e, Event.class);
        event.setUser(user);
        Event savedEvent = eventRepository.save(event);
        EventDto res = mapper.map(savedEvent, EventDto.class);
        return res;
    }
    @Transactional
    public void delete(Long id) {
        User user = getUser();
        eventRepository.deleteByUserAndId(user, id);
    }
    @Transactional
    public EventDto update(EventDto e) {
        User user = getUser();
        Event event = eventRepository.findByUserAndId(user, e.getId())
                .orElseThrow(() -> new EntityNotFoundException("Could not find event"));
        event.setTitle(e.getTitle());
        event.setStartDate(e.getStartDate());
        event.setStartTime(e.getStartTime());
        event.setEndTime(e.getEndTime());
        event.setUser(user);
        Event updatedEvent = eventRepository.save(event);
        EventDto res = mapper.map(updatedEvent, EventDto.class);
        return res;
    }
}
