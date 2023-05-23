package crm.Customer.Relationship.Management.repositories;

import crm.Customer.Relationship.Management.domain.Event;
import crm.Customer.Relationship.Management.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByEvent(Event event);

    Notification findFirstByEventOrderByCreatedDesc(Event event);

    List<Notification> findByEventAndWasReadFalse(Event event);

    List<Notification> findAllByUserUsernameAndWasReadFalse(String currentUsername);
}
