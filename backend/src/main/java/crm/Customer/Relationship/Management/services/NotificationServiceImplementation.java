package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Notification;
import crm.Customer.Relationship.Management.dto.NotificationResponse;
import crm.Customer.Relationship.Management.repositories.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImplementation implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<NotificationResponse> getAllNotifications(String currentUsername) {
        List<Notification> notifications = notificationRepository.findAllByUserUsernameAndWasReadFalse(currentUsername);
        return entitiesToResponses(notifications);
    }

    private List<NotificationResponse> entitiesToResponses(List<Notification> notifications) {
        List<NotificationResponse> responses = new ArrayList<>();
        for (Notification notification : notifications) {
            responses.add(entityToResponse(notification));
        }
        return responses;
    }

    private NotificationResponse entityToResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .eventTitle(notification.getEvent().getTitle())
                .username(notification.getUser().getUsername())
                .created(notification.getCreated())
                .wasRead(notification.isWasRead())
                .content(notification.getContent())
                .build();
    }
}
