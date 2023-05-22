package crm.Customer.Relationship.Management.controller;

import crm.Customer.Relationship.Management.domain.ContactPerson;
import crm.Customer.Relationship.Management.services.ContactPersonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(originPatterns = "http://localhost:4200")
@RequestMapping("/contactPersons")
public class ContactPersonController {

    private final ContactPersonService contactPersonService;

    @GetMapping
    public List<String> findAllEmails() {
        System.out.println("-----------------------------------"+contactPersonService.findAllEmails());
        return contactPersonService.findAllEmails();
    }
}
