package crm.Customer.Relationship.Management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationRequest {
    private Long userId;

    private String content;

}
