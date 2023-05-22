package crm.Customer.Relationship.Management;

import crm.Customer.Relationship.Management.domain.User;
import crm.Customer.Relationship.Management.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthenticationFacade {

    private final UserRepository userRepository;

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public User getAuthenticatedUser() {
        String username = this.getAuthentication().getName();
        return userRepository.findByUsername(username);
    }

}
