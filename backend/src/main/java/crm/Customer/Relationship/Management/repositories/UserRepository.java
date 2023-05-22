package crm.Customer.Relationship.Management.repositories;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query("SELECT u.username FROM User u")
    List<String> findAllUsernames();

}
