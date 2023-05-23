package crm.Customer.Relationship.Management.services;

import crm.Customer.Relationship.Management.domain.Client;
import crm.Customer.Relationship.Management.domain.Role;
import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.ClientResponse;
import crm.Customer.Relationship.Management.dto.UserDetailsResponse;
import crm.Customer.Relationship.Management.dto.UserResponse;
import crm.Customer.Relationship.Management.repositories.ClientRepository;
import crm.Customer.Relationship.Management.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImplementation implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    public User updateUser(User updatedUser) {
        User existingUser = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setFirstname(updatedUser.getFirstname());
        existingUser.setLastname(updatedUser.getLastname());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setRoles(updatedUser.getRoles());
        // Weitere aktualisierte Eigenschaften hinzufügen

        return userRepository.save(existingUser);
    }

    public List<String> getAllUsernames() {
        return userRepository.findAllUsernames();
    }

    public List<UserResponse> getUsers() {
        List<User> users = userRepository.findAll();
        return entitiesToResponses(users);
    }

    private List<UserResponse> entitiesToResponses(List<User> users) {
        List<UserResponse> clientsResponse = new ArrayList<>();

        for (User user : users) {
            clientsResponse.add(entityToResponse(user));
        }
        return clientsResponse;
    }

    private UserResponse entityToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .build();
    }

    public UserDetailsResponse getUser(Long id) {
        if (userRepository.findById(id).isPresent()) {
            User user = userRepository.findById(id).get();
            return UserDetailsResponse.builder()
                    .username(user.getUsername())
                    .firstname(userRepository.findById(id).get().getFirstname())
                    .lastname(userRepository.findById(id).get().getLastname())
                    .email(userRepository.findById(id).get().getEmail())
                    .roles(getUserRoles(user))
                    .officeId(user.getOffice().getId())
                    .build();
        }
        return new UserDetailsResponse();
    }

    private Set<String> getUserRoles(User user) {
        return user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
    }
}

