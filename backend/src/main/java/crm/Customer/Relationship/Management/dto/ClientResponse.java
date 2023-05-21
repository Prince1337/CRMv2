package crm.Customer.Relationship.Management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String street;

    private String postcode;

    private String city;

    private String region;

    private String country;

    private String contactFirstname;

    private String contactLastname;

    private String contactEmail;

    private String contactPhone;

    private String username;
}
