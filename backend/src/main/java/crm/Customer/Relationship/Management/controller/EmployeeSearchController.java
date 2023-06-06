package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.AuthenticationFacade;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employeeSearch")
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:4200")
public class EmployeeSearchController {

    private final AuthenticationFacade authenticationFacade;
    private final ClientService clientService;

    // DEFAULT SEARCH - USER CLIENTS
    @GetMapping
    public List<ClientResponse> defaultSearch(){
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        return clientService.findByUser(currentUsername);
    }

    // CITY SEARCH
    @GetMapping("/city")
    public List<ClientResponse> searchClientsByCity(@RequestParam("city") String city) {
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        return clientService.searchClientsByCity(city, currentUsername);
    }


}
