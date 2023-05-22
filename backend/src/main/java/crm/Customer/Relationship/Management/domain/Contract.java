package crm.Customer.Relationship.Management.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

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
    @JsonIgnore
    private User author;

    @ManyToOne
    @JoinColumn(name = "acceptedBy_id")
    @JsonIgnore
    private User acceptedBy;

    @ManyToOne
    @JoinColumn(name = "client")
    @JsonIgnore
    private Client client;

    private Double value;

}
