package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.exceptions.ClientNotFoundException;
import crm.Customer.Relationship.Management.repositories.ClientRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientServiceImplementation implements ClientService {

    private final ClientRepository clientRepository;

    public ClientServiceImplementation(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Override
    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }

    @Override
    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Client not found with id " + id));
    }

    @Override
    public Client createClient(Client client) {
        return clientRepository.save(client);
    }

    @Override
    public Client updateClient(Long id, Client client) {
        getClientById(id); // check if client exists
        client.setId(id); // set id of updated client
        return clientRepository.save(client);
    }

    @Override
    public void deleteClient(Long id) {
        getClientById(id); // check if client exists
        clientRepository.deleteById(id);
    }
}

