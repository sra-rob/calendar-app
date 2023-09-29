package com.server.backend.repositories;

import com.server.backend.entities.Event;
import com.server.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Long> {
    @Query("SELECT e FROM Event e WHERE e.startDate >= :intervalStart AND e.startDate <= :intervalEnd AND e.user = :user")
    List<Event> findByInterval(LocalDate intervalStart, LocalDate intervalEnd, User user);
    @Modifying
    @Query("DELETE FROM Event e WHERE e.user = :user AND e.id = :id")
    void deleteByUserAndId(User user, Long id);
    @Query("SELECT e FROM Event e where e.user = :user AND e.id = :id")
    Optional<Event> findByUserAndId(User user, Long id);
}
