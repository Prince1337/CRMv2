package crm.Customer.Relationship.Management.dto;

import crm.Customer.Relationship.Management.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoleResponse {

    Long id;
    String name;

}
