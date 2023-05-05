package crm.Customer.Relationship.Management.repositories;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@RepositoryRestResource
public interface ClientRepository extends JpaRepository<Client, Long> {
    List<Client> findByAddressCity(String city);

}

