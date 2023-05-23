package crm.Customer.Relationship.Management.dto;

import crm.Customer.Relationship.Management.domain.Event;
import crm.Customer.Relationship.Management.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {

    private Long id;

    private String eventTitle;

    private String username;

    private LocalDateTime created;

    private boolean wasRead;

    private String content;
}
