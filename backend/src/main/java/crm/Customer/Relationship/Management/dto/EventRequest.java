package crm.Customer.Relationship.Management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class EventRequest {
    private String type;

    private String title;

    private Long clientId;

    private LocalDateTime time;

}
