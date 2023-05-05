package crm.Customer.Relationship.Management.dto;

import crm.Customer.Relationship.Management.domain.Address;
import crm.Customer.Relationship.Management.domain.ContactPerson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClientRequest {

    private String firstName;

    private String lastName;

    private Address address;

    private ContactPerson contactPerson;

    private Long userId;

}

