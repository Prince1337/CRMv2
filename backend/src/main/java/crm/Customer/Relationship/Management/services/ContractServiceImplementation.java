package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.Contract;
import crm.Customer.Relationship.Management.domain.Role;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.GenerateContractRequest;
import crm.Customer.Relationship.Management.repositories.ContractRepository;
import crm.Customer.Relationship.Management.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContractServiceImplementation implements ContractService {

    private final ContractRepository contractRepository;

    private final JwtService jwtService;

    private final ClientService clientService;

    private final UserRepository userRepository;

    @Override
    public Contract generateContract(GenerateContractRequest request, String currentUsername) {
        Client client = clientService.getClientById(request.getClientId());
        User author = userRepository.findByUsername(currentUsername);
        Contract contract = Contract.builder()
                .title("Contract for " + client.getFirstName() + " " + client.getLastName())
                .filename("contract-" + client.getId() + "-" + System.currentTimeMillis() + ".pdf")
                .created(LocalDateTime.now())
                .accepted(false)
                .author(author)
                .client(client)
                .value(request.getValue())
                .build();

        return contractRepository.save(contract);
    }

    @Override
    public void acceptContract(Long contractId, String currentUsername) throws AccessDeniedException {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new EntityNotFoundException("Contract not found"));
        User currentUser = userRepository.findByUsername(currentUsername);
        if (currentUser.getRole().equals(Role.ADMIN)) {
            contract.setAccepted(true);
            contract.setAcceptedBy(currentUser);
            contractRepository.save(contract);
        } else if (currentUser.getRole().equals(Role.MANAGER) && contract.getValue() <= 10000) {
            contract.setAccepted(true);
            contract.setAcceptedBy(currentUser);
            contractRepository.save(contract);
        } else if (currentUser.getRole().equals(Role.EMPLOYEE) && contract.getValue() <= 1000) {
            contract.setAccepted(true);
            contract.setAcceptedBy(currentUser);
            contractRepository.save(contract);
        } else {
            throw new AccessDeniedException("You don't have permission to accept this contract");
        }
    }
}
