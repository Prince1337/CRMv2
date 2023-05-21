package crm.Customer.Relationship.Management.apis;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.dto.ClientRequest;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.repositories.UserRepository;
import crm.Customer.Relationship.Management.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientResource")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:4200")
public class ClientResource {

    private final ClientService clientService;

    private final UserRepository userRepository;

    @GetMapping("/{id}")
    ResponseEntity<Client> getClient(@PathVariable Long id) {
        Client client = clientService.getClientById(id);
        return ResponseEntity.ok(client);
    }

    @GetMapping
    ResponseEntity<List<ClientResponse>> getClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteUser(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/{username}")
    ResponseEntity<ClientResponse> createClient(@PathVariable String username, @RequestBody ClientRequest request) {
        request.setUsername(userRepository.findByUsername(username).getUsername());
        return ResponseEntity.ok(clientService.createClient(request));
    }

}
