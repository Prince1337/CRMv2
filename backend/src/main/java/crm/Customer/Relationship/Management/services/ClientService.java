package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.dto.ClientRequest;
import crm.Customer.Relationship.Management.dto.ClientResponse;

import java.util.List;

public interface ClientService {

    List<ClientResponse> getAllClients();

    Client getClientById(Long id);

    ClientResponse getClient(Long id);

    ClientResponse createClient(ClientRequest client);

    ClientResponse updateClient(Long id, ClientRequest client);

    void deleteClient(Long id);

    List<ClientResponse> searchClientsByCity(String city, String username);
    
    List<ClientResponse> findByUser(String currentUsername);

    List<ClientResponse> findByClientNameAndCity(String name, String currentUserCity);

    List<ClientResponse> findByAddressCity(String city);

    List<ClientResponse> findByAddressRegion(String region);

    List<ClientResponse> findByLastName(String name);
}

