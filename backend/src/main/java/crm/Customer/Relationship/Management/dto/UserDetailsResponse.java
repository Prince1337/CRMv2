package crm.Customer.Relationship.Management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsResponse {

    private Long id;
    private String username;
    private String firstname;
    private String lastname;
    private String email;
    private Set<String> roles;
}
