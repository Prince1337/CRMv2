package crm.Customer.Relationship.Management.repositories;

import crm.Customer.Relationship.Management.domain.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ContractRepository extends JpaRepository<Contract, Long> {
}
