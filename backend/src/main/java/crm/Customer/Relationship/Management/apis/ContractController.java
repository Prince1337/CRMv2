package crm.Customer.Relationship.Management.apis;

import crm.Customer.Relationship.Management.domain.Contract;
import crm.Customer.Relationship.Management.dto.GenerateContractRequest;
import crm.Customer.Relationship.Management.services.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;

    @PostMapping("/{clientId}")
    public Contract generateContract(@RequestBody GenerateContractRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        return contractService.generateContract(request, currentUsername);
    }

    @PutMapping("/{contractId}/accept")
    public void acceptContract(@PathVariable Long contractId) throws AccessDeniedException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        contractService.acceptContract(contractId, currentUsername);
    }
}
