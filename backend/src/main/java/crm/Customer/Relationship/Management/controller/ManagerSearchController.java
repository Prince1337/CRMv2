package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.AuthenticationFacade;
import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.repositories.ClientRepository;
import crm.Customer.Relationship.Management.services.ClientService;
import crm.Customer.Relationship.Management.services.MyUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/managerSearch")
@RequiredArgsConstructor
public class ManagerSearchController {

    private final AuthenticationFacade authenticationFacade;
    private final ClientService clientService;
    private List<Client> clientList;

    // ALL CLIENTS SEARCH
    @GetMapping("/all")
    public ResponseEntity<List<ClientResponse>> allSearch() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    // CITY SEARCH
    @GetMapping(path = "/city")
    public ResponseEntity<List<Client>> citySearch(@RequestParam String city) {
        clientList = clientService.findByAddressCity(city);
        return ResponseEntity.ok(clientList);
    }

    // MANAGER REGION SEARCH
    @GetMapping(path = "/region")
    public String citySearch() {
        User user = authenticationFacade.getAuthenticatedUser();
        clientList = clientService
                .findByAddressRegion(user.getOffice().getAddress().getRegion());
        return "manager/search";
    }

    // NAME SEARCH
    @GetMapping(path = "/name")
    public ResponseEntity<List<Client>> nameSearch(@RequestParam String name) {
        clientList = clientService.findByName(name);
        return ResponseEntity.ok(clientList);
    }
}
