package crm.Customer.Relationship.Management.repositories;

import com.fasterxml.jackson.annotation.JacksonInject;
import crm.Customer.Relationship.Management.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role getRoleByName(String admin);


    Set<Role> getRolesByNameIsIn(Set<String> roles);

    Role findByName(String role);
}
