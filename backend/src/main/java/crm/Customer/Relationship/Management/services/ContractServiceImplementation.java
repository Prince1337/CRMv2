package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.Contract;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.dto.ContractResponse;
import crm.Customer.Relationship.Management.dto.ContractRequest;
import crm.Customer.Relationship.Management.repositories.ContractRepository;
import crm.Customer.Relationship.Management.repositories.RoleRepository;
import crm.Customer.Relationship.Management.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContractServiceImplementation implements ContractService {

    private final ContractRepository contractRepository;

    private final JwtService jwtService;

    private final ClientService clientService;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    @Override
    public ContractResponse generateContract(ContractRequest request, String currentUsername) {
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
        contract = contractRepository.save(contract);

        return ContractResponse.builder()
                .id(contract.getId())
                .title(contract.getTitle())
                .filename(contract.getFilename())
                .created(contract.getCreated())
                .accepted(contract.isAccepted())
                .authorName(contract.getAuthor().getFirstname() + " " + contract.getAuthor().getLastname())
                .clientName(client.getFirstName() + " " + client.getLastName())
                .value(contract.getValue())
                .build();
    }

    @Override
    public void acceptContract(Long contractId, String currentUsername) throws AccessDeniedException {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new EntityNotFoundException("Contract not found"));
        User currentUser = userRepository.findByUsername(currentUsername);
        if (currentUser.getRoles().contains(roleRepository.getRoleByName("ADMIN"))) {
            contract.setAccepted(true);
            contract.setAcceptedBy(currentUser);
            contractRepository.save(contract);
        } else if (currentUser.getRoles().contains(roleRepository.getRoleByName("MANAGER")) && contract.getValue() <= 10000) {
            contract.setAccepted(true);
            contract.setAcceptedBy(currentUser);
            contractRepository.save(contract);
        } else if (currentUser.getRoles().contains(roleRepository.getRoleByName("EMPLOYEE")) && contract.getValue() <= 1000) {
            contract.setAccepted(true);
            contract.setAcceptedBy(currentUser);
            contractRepository.save(contract);
        } else {
            throw new AccessDeniedException("You don't have permission to accept this contract");
        }
    }

    @Override
    public List<ContractResponse> getAllContracts(String currentUsername) {
        List<Contract> contracts = contractRepository.findByAuthorUsername(currentUsername);
        List<ContractResponse> contractResponses = new ArrayList<>();
        for(Contract contract : contracts) {
            contractResponses.add(entityToResponse(contract));
        }
        return contractResponses;
    }

    @Override
    public ContractResponse getContractById(Long contractId, String currentUsername) {
        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new EntityNotFoundException("Contract not found"));
        return entityToResponse(contract);
    }

    private ContractResponse entityToResponse(Contract contract) {
        return ContractResponse.builder()
                .id(contract.getId())
                .title(contract.getTitle())
                .filename(contract.getFilename())
                .created(contract.getCreated())
                .accepted(contract.isAccepted())
                .authorName(contract.getAuthor().getFirstname() + " " + contract.getAuthor().getLastname())
                .clientName(contract.getClient().getFirstName() + " " + contract.getClient().getLastName())
                .value(contract.getValue())
                .build();
    }
}
