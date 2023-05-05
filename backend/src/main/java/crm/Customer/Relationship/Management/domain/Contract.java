package crm.Customer.Relationship.Management.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Contract {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;

    private String filename;

    private LocalDateTime created;

    private boolean accepted;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "acceptedBy_id")
    private User acceptedBy;

    @ManyToOne
    @JoinColumn(name = "client")
    private Client client;

    private Double value;

}
