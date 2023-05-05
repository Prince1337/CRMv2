package crm.Customer.Relationship.Management.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Table(name = "clients")
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;

    private String lastName;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    private Address address;

    @OneToOne(cascade = CascadeType.ALL, optional = true)
    private ContactPerson contactPerson;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

}
