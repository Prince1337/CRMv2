package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.dto.NotificationResponse;

import java.util.List;

public interface NotificationService {

    List<NotificationResponse> getAllNotifications(String currentUsername);
}
