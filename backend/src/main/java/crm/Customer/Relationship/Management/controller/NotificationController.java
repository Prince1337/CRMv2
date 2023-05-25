package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.AuthenticationFacade;
import crm.Customer.Relationship.Management.domain.Notification;
import crm.Customer.Relationship.Management.dto.NotificationResponse;
import crm.Customer.Relationship.Management.repositories.NotificationRepository;
import crm.Customer.Relationship.Management.services.EventService;
import crm.Customer.Relationship.Management.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
@CrossOrigin(originPatterns = "http://localhost:4200")
public class NotificationController {
    private final NotificationService notificationService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getAllNotifications() {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        List<NotificationResponse> notificationResponses = notificationService.getAllNotifications(currentUsername);
        return ResponseEntity.ok(notificationResponses);
    }


}
