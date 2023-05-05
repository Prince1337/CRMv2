package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.ClientRequest;
import crm.Customer.Relationship.Management.dto.ClientResponse;

import java.util.List;

public interface ClientService {

    List<Client> getAllClients();

    Client getClientById(Long id);

    ClientResponse createClient(ClientRequest client);

    ClientResponse updateClient(Long id, ClientRequest client);

    void deleteClient(Long id);

    List<Client> searchClientsByCity(String city);


}

