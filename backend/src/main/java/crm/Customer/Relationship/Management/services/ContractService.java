package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Contract;
import crm.Customer.Relationship.Management.dto.ContractResponse;
import crm.Customer.Relationship.Management.dto.GenerateContractRequest;

import java.nio.file.AccessDeniedException;

public interface ContractService {
    ContractResponse generateContract(GenerateContractRequest request, String currentUsername);

    void acceptContract(Long contractId, String currentUsername) throws AccessDeniedException;
}
