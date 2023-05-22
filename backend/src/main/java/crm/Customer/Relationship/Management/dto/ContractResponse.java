package crm.Customer.Relationship.Management.dto;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContractResponse {
    Long id;
    String title;
    String filename;
    LocalDateTime created;
    Boolean accepted;
    String authorName;
    String clientName;
    Double value;

}
