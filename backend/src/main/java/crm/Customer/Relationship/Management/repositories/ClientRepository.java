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
    List<Client> findByUserUsername (String username);

    List<Client> findByLastNameContainingIgnoreCaseAndAddressCityOrderByLastNameAsc(String name, String currentUserCity);

    List<Client> findByAddressCityContainingIgnoreCaseOrderByLastNameAsc(String city);

    List<Client> findByAddressRegionOrderByLastNameAsc(String region);

    List<Client> findByLastNameContainingIgnoreCaseOrderByLastNameAsc(String name);

    List<Client> findClientsByUserId(Long id);

    List<Client> findByAddressRegionContainingIgnoreCaseOrderByLastNameAsc(String region);

    List<Client> findByAddressCityContainingAndUserUsernameContainingOrderByAddressCityAsc(String city, String username);
    List<Client> findByUserUsernameContainingIgnoreCaseAndAddressCityOrderByAddressCityAsc (String username, String city);
}

