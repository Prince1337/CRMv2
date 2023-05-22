package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.Event;
import crm.Customer.Relationship.Management.domain.Notification;
import crm.Customer.Relationship.Management.dto.EventRequest;
import crm.Customer.Relationship.Management.dto.EventResponse;
import crm.Customer.Relationship.Management.repositories.EventRepository;
import crm.Customer.Relationship.Management.repositories.NotificationRepository;
import crm.Customer.Relationship.Management.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImplementation implements EventService {

    private final EventRepository eventRepository;

    private List<Event> todayEventList = new ArrayList<>();

    private final NotificationRepository notificationRepository;

    private final UserRepository userRepository;

    private final ClientService clientService;

    @Override
    public EventResponse addEvent(EventRequest eventRequest, String currentUsername) {
        Client client = clientService.getClientById(eventRequest.getClientId());
        Event event = new Event();
        event.setType(eventRequest.getType());
        event.setTitle(eventRequest.getTitle());
        event.setClient(client);
        event.setUser(userRepository.findByUsername(currentUsername));
        event.setTime(eventRequest.getTime());
        event.setNotifications(new ArrayList<>());
        event = eventRepository.save(event);
        return EventResponse.builder()
                .title(event.getTitle())
                .type(event.getType())
                .time(event.getTime())
                .build();
    }

    @Override
    public EventResponse updateEvent(Long eventId, EventRequest eventRequest, String currentUsername) throws AccessDeniedException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
        if (!event.getUser().equals(userRepository.findByUsername(currentUsername))) {
            throw new AccessDeniedException("You don't have permission to edit this event");
        }
        Client client = clientService.getClientById(eventRequest.getClientId());
        event.setType(eventRequest.getType());
        event.setTitle(eventRequest.getTitle());
        event.setClient(client);
        event.setTime(eventRequest.getTime());
        event = eventRepository.save(event);
        return EventResponse.builder()
                .title(event.getTitle())
                .type(event.getType())
                .time(event.getTime())
                .build();
    }

    @Override
    public void deleteEvent(Long eventId, String currentUsername) throws AccessDeniedException {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EntityNotFoundException("Event not found"));
        if (!event.getUser().equals(userRepository.findByUsername(currentUsername))) {
            throw new AccessDeniedException("You don't have permission to delete this event");
        }
        eventRepository.delete(event);
    }

    @Override
    public void markNotificationAsRead(Long notificationId, String currentUsername) throws AccessDeniedException {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));
        if (!notification.getUser().equals(userRepository.findByUsername(currentUsername))) {
            throw new AccessDeniedException("You don't have permission to mark this notification as read");
        }
        notification.setWasRead(true);
        notificationRepository.save(notification);
    }

    @Override
    @Scheduled(cron = "0 */5 9-17 * * MON-FRI")
    public void checkIfGenerateNotification() {
        todayEventList = eventRepository.findByTimeBetween(LocalDateTime.now(), LocalDateTime.now().plusDays(1));

        for (Event event : todayEventList) {
            // delete event from list if it's in the past
            if (LocalDateTime.now().isAfter(event.getTime())) {

                List<Notification> list = notificationRepository.findByEvent(event);
                notificationRepository.deleteAll(list);
                todayEventList.remove(event);
                eventRepository.delete(event);

                // generate notification if event is in 1 hour
            } else if (LocalDateTime.now().plusHours(1).isAfter(event.getTime())) {
                Notification notification = notificationRepository.findFirstByEventOrderByCreatedDesc(event);
                List<Notification> notificationList = notificationRepository.findByEventAndWasReadFalse(event);
                if (notificationList.size() < 3) {

                    this.generateNotification(event);
                }
                // generate notification if event is in 2 hours
            } else if (LocalDateTime.now().plusHours(2).isAfter(event.getTime())) {
                Notification notification = notificationRepository.findFirstByEventOrderByCreatedDesc(event);
                List<Notification> notificationList = notificationRepository.findByEventAndWasReadFalse(event);
                if (notificationList.size() < 2) {

                    this.generateNotification(event);
                }
            }

        }

    }


    @Override
    @Scheduled(cron = "0 30 8 * * MON-FRI")
    public void generateMorningNotifications() {
        todayEventList = eventRepository.findByTimeBetween(LocalDateTime.now(), LocalDateTime.now().plusDays(1));
        // generate notifications for all today's events
        for (Event event : todayEventList) {
            this.generateNotification(event);
        }
    }

    private void generateNotification(Event event) {
        Notification notification = new Notification();
        notification.setCreated(LocalDateTime.now());
        notification.setEvent(event);
        notification.setWasRead(false);
        notification.setUser(event.getUser());
        notification.setContent(
                "You have " + event.getType() + " with " + event.getClient().getUser().getUsername() + " at " + event.getTime()
                        + ". Topic: " + event.getTitle());
        notificationRepository.save(notification);
    }

}
