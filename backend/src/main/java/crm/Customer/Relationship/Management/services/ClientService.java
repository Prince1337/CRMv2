package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;

import java.util.List;

public interface ClientService {

    List<Client> getAllClients();

    Client getClientById(Long id);

    Client createClient(Client client);

    Client updateClient(Long id, Client client);

    void deleteClient(Long id);

}

