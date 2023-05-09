package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.ClientRequest;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.exceptions.ClientNotFoundException;
import crm.Customer.Relationship.Management.repositories.ClientRepository;
import crm.Customer.Relationship.Management.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImplementation implements ClientService {

    private final ClientRepository clientRepository;
    private final UserRepository userRepository;

    @Override
    public List<ClientResponse> getAllClients() {

        List<Client> clients = clientRepository.findAll();
        List<ClientResponse> clientsResponse = new ArrayList<>();
        for (Client client : clients) {
            clientsResponse.add(ClientResponse.builder()
                    .id(client.getId())
                    .firstName(client.getFirstName())
                    .lastName(client.getLastName())
                    .created(client.getCreated())
                    .address(client.getAddress())
                    .contactPerson(client.getContactPerson())
                    .username(userRepository.findUserById(client.getUser().getId()).getUsername())
                    .build());
        }

        return clientsResponse;
    }

    @Override
    public Client getClientById(Long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Client not found with id " + id));
    }

    @Override
    public ClientResponse createClient(ClientRequest clientRequest) {
        Client client = Client.builder()
                .firstName(clientRequest.getFirstName())
                .lastName(clientRequest.getLastName())
                .address(clientRequest.getAddress())
                .contactPerson(clientRequest.getContactPerson())
                .user(userRepository.findUserById(clientRequest.getUserId()))
                .build();
        client.setCreated(new Date());
        client = clientRepository.save(client);
        return ClientResponse.builder()
                .id(client.getId())
                .firstName(client.getFirstName())
                .lastName(client.getLastName())
                .created(client.getCreated())
                .address(client.getAddress())
                .contactPerson(client.getContactPerson())
                .username(userRepository.findUserById(client.getUser().getId()).getUsername())
                .build();
    }

    @Override
    public ClientResponse updateClient(Long id, ClientRequest clientRequest) {
        Client client = getClientById(id);
        client.setFirstName(clientRequest.getFirstName());
        client.setLastName(clientRequest.getLastName());
        client.setAddress(clientRequest.getAddress());
        client.setContactPerson(clientRequest.getContactPerson());
        client.setUser(userRepository.findUserById(clientRequest.getUserId()));
        client = clientRepository.save(client);
        return ClientResponse.builder()
                .id(client.getId())
                .firstName(client.getFirstName())
                .lastName(client.getLastName())
                .address(client.getAddress())
                .contactPerson(client.getContactPerson())
                .username(userRepository.findUserById(client.getUser().getId()).getUsername())
                .build();
    }

    @Override
    public void deleteClient(Long id) {
        getClientById(id); // check if client exists
        clientRepository.deleteById(id);
    }

    @Override
    public List<Client> searchClientsByCity(String city) {
        return clientRepository.findByAddressCity(city);
    }

    @Override
    public List<Client> findByUser(String currentUsername) {
        return clientRepository.findByUserUsername(currentUsername);
    }

    @Override
    public List<Client> findByClientNameAndCity(String name, String currentUserCity) {
        return clientRepository.findByLastNameContainingIgnoreCaseAndAddressCityOrderByLastNameAsc(name, currentUserCity);
    }

    @Override
    public List<Client> findByAddressCity(String city) {
        return clientRepository.findByAddressCityContainingIgnoreCaseOrderByLastNameAsc(city);
    }

    @Override
    public List<Client> findByAddressRegion(String region) {
        return clientRepository.findByAddressRegionOrderByLastNameAsc(region);
    }

    @Override
    public List<Client> findByName(String name) {
        return clientRepository.findByLastNameContainingIgnoreCaseOrderByLastNameAsc(name);
    }


}

