package crm.Customer.Relationship.Management.dto;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.Office;
import crm.Customer.Relationship.Management.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
}
