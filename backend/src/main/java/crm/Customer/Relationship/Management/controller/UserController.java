package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.dto.UserDetailsResponse;
import crm.Customer.Relationship.Management.dto.UserResponse;
import crm.Customer.Relationship.Management.services.UserDetailsServiceImplementation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@CrossOrigin(originPatterns = "http://localhost:4200")
public class UserController {

    private final UserDetailsServiceImplementation userDetailsService;

    @GetMapping
    public List<String> getAllUsernames() {
        return userDetailsService.getAllUsernames();
    }

    @GetMapping("/admin/user/{id}")
    public ResponseEntity<UserDetailsResponse> getUser(@PathVariable Long id) {
        UserDetailsResponse response = userDetailsService.getUser(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/admin/user/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        updatedUser.setId(id);
        return userDetailsService.updateUser(updatedUser);
    }

    @GetMapping("/admin/users")
    public ResponseEntity<List<UserResponse>> getUser() {
        List<UserResponse> userResponses = userDetailsService.getUsers();
        return ResponseEntity.ok(userResponses);

    }
}