package crm.Customer.Relationship.Management.repositories;

import crm.Customer.Relationship.Management.domain.Event;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.EventResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByTimeBetween(LocalDateTime now, LocalDateTime plusDays);

    List<Event> findAllByUser(User byUsername);
}
