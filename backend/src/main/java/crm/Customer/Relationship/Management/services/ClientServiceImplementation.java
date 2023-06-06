package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Address;
import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.dto.ClientRequest;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.exceptions.ClientNotFoundException;
import crm.Customer.Relationship.Management.repositories.ClientRepository;
import crm.Customer.Relationship.Management.repositories.ContactPersonRepository;
import crm.Customer.Relationship.Management.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImplementation implements ClientService {

    private final ClientRepository clientRepository;

    private final ContactPersonRepository contactPersonRepository;
    private final UserRepository userRepository;

    @Override
    public List<ClientResponse> getAllClients() {

        List<Client> clients = clientRepository.findAll();
        return entitiesToResponses(clients);
    }

    @Override
    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Client not found with id " + id));
    }

    @Override
    public ClientResponse getClient(Long id) {
        return entityToResponse(getClientById(id));
    }

    @Override
    public ClientResponse createClient(ClientRequest clientRequest) {
        Client client = requestToEntity(clientRequest);
        client.setCreated(new Date());
        client = clientRepository.save(client);
        return entityToResponse(client);
    }



    @Override
    public ClientResponse updateClient(Long id, ClientRequest clientRequest) {
        Address address = getAddress(clientRequest);
        System.out.println("-------------------------" + clientRequest);

        Client client = getClientById(id);
        client.setFirstName(clientRequest.getFirstName());
        client.setLastName(clientRequest.getLastName());
        client.setAddress(address);
        client.setContactPerson(contactPersonRepository.findByEmail(clientRequest.getContactEmail()));
        client.setUser(userRepository.findByUsername(clientRequest.getUsername()));

        client = clientRepository.save(client);
        return entityToResponse(client);
    }

    @Override
    public void deleteClient(Long id) {
        Client client = getClientById(id); // check if client exists
        if (client == null) {
            throw new ClientNotFoundException("Client not found with id " + id);
        } else {
            clientRepository.deleteById(id);
        }
    }

    @Override
    public List<ClientResponse> searchClientsByCity(String city, String username) {

        List<Client> clients = clientRepository.findByAddressCityContainingAndUserUsernameContainingOrderByAddressCityAsc(city, username);
        return entitiesToResponses(clients);
    }

    @Override
    public List<ClientResponse> findByUser(String currentUsername) {
        List<Client> clients =  clientRepository.findByUserUsername(currentUsername);
        return entitiesToResponses(clients);
    }

    @Override
    public List<ClientResponse> findByClientNameAndCity(String name, String currentUserCity) {
        List<Client> clients =  clientRepository.findByLastNameContainingIgnoreCaseAndAddressCityOrderByLastNameAsc(name, currentUserCity);
        return entitiesToResponses(clients);
    }

    @Override
    public List<ClientResponse> findByAddressCity(String city) {
        List<Client> clients =  clientRepository.findByAddressCityContainingIgnoreCaseOrderByLastNameAsc(city);
        return entitiesToResponses(clients);
    }

    @Override
    public List<ClientResponse> findByAddressRegion(String region) {
        List<Client> clients =  clientRepository.findByAddressRegionContainingIgnoreCaseOrderByLastNameAsc(region);
        return entitiesToResponses(clients);
    }

    @Override
    public List<ClientResponse> findByLastName(String lastName) {
        List<Client> clients =  clientRepository.findByLastNameContainingIgnoreCaseOrderByLastNameAsc(lastName);
        return entitiesToResponses(clients);
    }

    private Client requestToEntity(ClientRequest clientRequest) {
        Address address = getAddress(clientRequest);

        return Client.builder()
                .firstName(clientRequest.getFirstName())
                .lastName(clientRequest.getLastName())
                .address(address)
                .contactPerson(contactPersonRepository.findByEmail(clientRequest.getContactEmail()))
                .user(userRepository.findByUsername(clientRequest.getUsername()))
                .build();
    }

    private Address getAddress(ClientRequest clientRequest) {
        Address address = new Address();
        address.setStreet(clientRequest.getStreet());
        address.setPostcode(clientRequest.getPostcode());
        address.setCity(clientRequest.getCity());
        address.setRegion(clientRequest.getRegion());
        address.setCountry(clientRequest.getCountry());
        return address;
    }



    private List<ClientResponse> entitiesToResponses(List<Client> clients) {
        List<ClientResponse> clientsResponse = new ArrayList<>();

        for (Client client : clients) {
            clientsResponse.add(entityToResponse(client));
        }
        return clientsResponse;
    }

    private ClientResponse entityToResponse(Client client) {
        return ClientResponse.builder()
                .id(client.getId())
                .firstName(client.getFirstName())
                .lastName(client.getLastName())
                .created(client.getCreated())
                .street(client.getAddress().getStreet())
                .postcode(client.getAddress().getPostcode())
                .city(client.getAddress().getCity())
                .region(client.getAddress().getRegion())
                .country(client.getAddress().getCountry())
                .contactFirstname(client.getContactPerson().getFirstName())
                .contactLastname(client.getContactPerson().getLastName())
                .contactEmail(client.getContactPerson().getEmail())
                .contactPhone(client.getContactPerson().getPhone())
                .username(userRepository.findByUsername(client.getUser().getUsername()).getUsername())
                .build();
    }

}

