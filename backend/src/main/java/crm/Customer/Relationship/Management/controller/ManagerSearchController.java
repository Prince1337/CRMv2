package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.AuthenticationFacade;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/managerSearch")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:4200")
public class ManagerSearchController {

    private final AuthenticationFacade authenticationFacade;
    private final ClientService clientService;
    private List<ClientResponse> clientResponses;

    // ALL CLIENTS SEARCH
    @GetMapping("/all")
    public ResponseEntity<List<ClientResponse>> allSearch() {
        List<ClientResponse> clientResponses = clientService.getAllClients();
        return ResponseEntity.ok(clientResponses);
    }

    // CITY SEARCH
    @GetMapping(path = "/city")
    public ResponseEntity<List<ClientResponse>> citySearch(@RequestParam String city) {
        clientResponses = clientService.findByAddressCity(city);
        return ResponseEntity.ok(clientResponses);
    }

    // MANAGER REGION SEARCH
    @GetMapping(path = "/region")
    public ResponseEntity<List<ClientResponse>> regionSearch(@RequestParam String region) {
        User user = authenticationFacade.getAuthenticatedUser();
        clientResponses = clientService
                .findByAddressRegion(user.getOffice().getAddress().getRegion());
        return ResponseEntity.ok(clientResponses);
    }

    // NAME SEARCH
    @GetMapping(path = "/name")
    public ResponseEntity<List<ClientResponse>> nameSearch(@RequestParam String name) {
        clientResponses = clientService.findByName(name);
        return ResponseEntity.ok(clientResponses);
    }
}
