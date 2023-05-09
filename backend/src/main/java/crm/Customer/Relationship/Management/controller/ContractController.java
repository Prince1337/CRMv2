package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.AuthenticationFacade;
import crm.Customer.Relationship.Management.domain.Contract;
import crm.Customer.Relationship.Management.dto.ContractResponse;
import crm.Customer.Relationship.Management.dto.GenerateContractRequest;
import crm.Customer.Relationship.Management.services.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/contracts")
@RequiredArgsConstructor
public class ContractController {

    private final ContractService contractService;
    private final AuthenticationFacade authenticationFacade;

    @PostMapping("/{clientId}")
    public ResponseEntity<ContractResponse> generateContract(@RequestBody GenerateContractRequest request) {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        System.out.println(authenticationFacade.getAuthenticatedUser().getAuthorities());
        return ResponseEntity.ok(contractService.generateContract(request, currentUsername));
    }

    @PutMapping("/{contractId}/accept")
    public void acceptContract(@PathVariable Long contractId) throws AccessDeniedException {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        contractService.acceptContract(contractId, currentUsername);
    }
}
