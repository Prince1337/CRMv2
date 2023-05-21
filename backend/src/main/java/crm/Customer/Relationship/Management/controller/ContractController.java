package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.AuthenticationFacade;
import crm.Customer.Relationship.Management.dto.ContractResponse;
import crm.Customer.Relationship.Management.dto.ContractRequest;
import crm.Customer.Relationship.Management.services.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/contracts")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:4200")
public class ContractController {

    private final ContractService contractService;
    private final AuthenticationFacade authenticationFacade;

    @PostMapping("/{clientId}")
    public ResponseEntity<ContractResponse> generateContract(@RequestBody ContractRequest request) {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        ContractResponse contractResponse = contractService.generateContract(request, currentUsername);
        return ResponseEntity.ok(contractResponse);
    }

    @GetMapping
    public ResponseEntity<List<ContractResponse>> getAllContracts() {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        List<ContractResponse> contractResponse = contractService.getAllContracts(currentUsername);
        return ResponseEntity.ok(contractResponse);
    }

    @PutMapping("/{contractId}/accept")
    public void acceptContract(@PathVariable Long contractId) throws AccessDeniedException {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        contractService.acceptContract(contractId, currentUsername);
    }
}
