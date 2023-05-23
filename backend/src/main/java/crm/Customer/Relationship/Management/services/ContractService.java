package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.dto.ContractResponse;
import crm.Customer.Relationship.Management.dto.ContractRequest;

import java.nio.file.AccessDeniedException;
import java.util.List;

public interface ContractService {
    ContractResponse generateContract(ContractRequest request, String currentUsername);

    void acceptContract(Long contractId, String currentUsername) throws AccessDeniedException;

    List<ContractResponse> getAllContracts(String currentUsername);

    ContractResponse getContractById(Long contractId, String currentUsername);
}
