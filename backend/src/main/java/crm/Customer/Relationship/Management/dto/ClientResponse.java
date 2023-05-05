package crm.Customer.Relationship.Management.dto;

import crm.Customer.Relationship.Management.domain.Address;
import crm.Customer.Relationship.Management.domain.ContactPerson;
import crm.Customer.Relationship.Management.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientResponse {
    private Long id;

    private String firstName;

    private String lastName;

    private Date created;

    private Address address;

    private ContactPerson contactPerson;

    private String username;
}
