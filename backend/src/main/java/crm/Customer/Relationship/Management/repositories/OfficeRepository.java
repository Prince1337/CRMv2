package crm.Customer.Relationship.Management.repositories;

import crm.Customer.Relationship.Management.domain.Office;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office, Long> {

    Office getOfficeById(Long office);
}
