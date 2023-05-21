package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.dto.ClientRequest;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:4200")
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<List<ClientResponse>> getAllClients() {
        List<ClientResponse> clientResponses = clientService.getAllClients();
        return ResponseEntity.ok(clientResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponse> getClientById(@PathVariable Long id) {
        ClientResponse clientResponse = clientService.getClient(id);
        return ResponseEntity.ok(clientResponse);
    }

    @PostMapping
    public ResponseEntity<ClientResponse> createClient(@RequestBody ClientRequest request) {
        ClientResponse clientResponse = clientService.createClient(request);
        return ResponseEntity.ok(clientResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponse> updateClient(@PathVariable Long id, @RequestBody ClientRequest request) {
        ClientResponse clientResponse = clientService.updateClient(id, request);
        return ResponseEntity.ok(clientResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}

