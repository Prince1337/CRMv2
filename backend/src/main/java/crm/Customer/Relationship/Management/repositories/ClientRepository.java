package crm.Customer.Relationship.Management.repositories;

import crm.Customer.Relationship.Management.domain.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

}

