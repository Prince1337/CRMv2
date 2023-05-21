package crm.Customer.Relationship.Management.repositories;

import crm.Customer.Relationship.Management.domain.ContactPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource
public interface ContactPersonRepository extends JpaRepository<ContactPerson, Long> {
    ContactPerson findByEmail(String contactEmail);

    @Query("SELECT c.email FROM ContactPerson c")
    List<String> findAllEmails();
}
