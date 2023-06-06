package crm.Customer.Relationship.Management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventResponse {

    private Long id;

    private String type;

    private String title;

    private LocalDateTime time;

    private String clientName;

    private String authorName;

}
