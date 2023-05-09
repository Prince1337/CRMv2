package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.AuthenticationFacade;
import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employeeSearch")
@RequiredArgsConstructor
public class EmployeeSearchController {

    private final AuthenticationFacade authenticationFacade;
    private final ClientService clientService;

    // DEFAULT SEARCH - USER CLIENTS
    @GetMapping
    public List<Client> defaultSearch(){
        String currentUsername = authenticationFacade.getAuthenticatedUser().getUsername();
        return clientService.findByUser(currentUsername);
    }

    // CITY SEARCH
    @GetMapping("/city")
    public List<Client> searchClientsByCity(@RequestParam("city") String city) {
        return clientService.searchClientsByCity(city);
    }

    @GetMapping("/name")
    public List<Client> searchClientsByName(@RequestParam("name") String name) {
        String currentUserCity = authenticationFacade.getAuthenticatedUser().getOffice().getAddress().getCity();
        return clientService.findByClientNameAndCity(name, currentUserCity);
    }
}
