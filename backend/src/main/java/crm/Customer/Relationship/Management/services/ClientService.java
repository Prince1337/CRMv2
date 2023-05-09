package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.dto.ClientRequest;
import crm.Customer.Relationship.Management.dto.ClientResponse;

import java.util.List;

public interface ClientService {

    List<ClientResponse> getAllClients();

    Client getClientById(Long id);

    ClientResponse createClient(ClientRequest client);

    ClientResponse updateClient(Long id, ClientRequest client);

    void deleteClient(Long id);

    List<Client> searchClientsByCity(String city);
    
    List<Client> findByUser(String currentUsername);

    List<Client> findByClientNameAndCity(String name, String currentUserCity);

    List<Client> findByAddressCity(String city);

    List<Client> findByAddressRegion(String region);

    List<Client> findByName(String name);
}

