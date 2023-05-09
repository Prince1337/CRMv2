package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Event;
import crm.Customer.Relationship.Management.domain.Notification;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.EventRequest;
import crm.Customer.Relationship.Management.dto.EventResponse;
import org.springframework.scheduling.annotation.Scheduled;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;

public interface EventService {
    EventResponse addEvent(EventRequest eventRequest, String currentUsername);

    EventResponse updateEvent(Long eventId, EventRequest eventRequest, String currentUsername) throws AccessDeniedException;

    void deleteEvent(Long eventId, String currentUsername) throws AccessDeniedException;

    void markNotificationAsRead(Long notificationId, String currentUsername) throws AccessDeniedException;

    @Scheduled(cron = "0 */5 9-17 * * MON-FRI")
    void checkIfGenerateNotification();

    @Scheduled(cron = "0 30 8 * * MON-FRI")
    void generateMorningNotifications();


}
