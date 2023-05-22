package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.ContactPerson;
import crm.Customer.Relationship.Management.repositories.ContactPersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactPersonServiceImplementation implements ContactPersonService {

    private final ContactPersonRepository contactPersonRepository;

    @Override
    public List<String> findAllEmails() {
        return contactPersonRepository.findAllEmails();
    }
}
