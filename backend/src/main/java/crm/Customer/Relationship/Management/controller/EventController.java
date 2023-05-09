package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.AuthenticationFacade;
import crm.Customer.Relationship.Management.domain.Event;
import crm.Customer.Relationship.Management.domain.Notification;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.EventRequest;
import crm.Customer.Relationship.Management.dto.EventResponse;
import crm.Customer.Relationship.Management.dto.NotificationRequest;
import crm.Customer.Relationship.Management.services.EventServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventServiceImplementation eventService;
    private final AuthenticationFacade authenticationFacade;

    @PostMapping
    public ResponseEntity<EventResponse> addEvent(@RequestBody EventRequest eventRequest) {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();

        return ResponseEntity.ok(eventService.addEvent(eventRequest, currentUsername));
    }

    @PutMapping("/{eventId}")
    public ResponseEntity<EventResponse> updateEvent(@PathVariable Long eventId, @RequestBody EventRequest eventRequest) throws AccessDeniedException {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();

        return ResponseEntity.ok(eventService.updateEvent(eventId, eventRequest, currentUsername));
    }

    @DeleteMapping("/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId) throws AccessDeniedException {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();

        eventService.deleteEvent(eventId, currentUsername);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/notifications/{notificationId}/mark-read")
    public ResponseEntity<Void> markNotificationAsRead(@PathVariable Long notificationId) throws AccessDeniedException {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();

        eventService.markNotificationAsRead(notificationId, currentUsername);
        return ResponseEntity.noContent().build();
    }
}
