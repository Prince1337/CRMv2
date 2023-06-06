import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/http/client.service';
import { ContractService } from 'src/app/core/http/contract.service';
import { ClientResponse } from 'src/app/shared/models/client-response';
import { ContractRequest } from 'src/app/shared/models/contract-request';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrls: ['./contract-add.component.css']
})
export class ContractAddComponent {

  contractForm!: FormGroup;
  clients!: ClientResponse[];

  constructor(private formBuilder: FormBuilder, private contractService: ContractService, private clientService: ClientService, 
    private router: Router) { }

  ngOnInit(): void {
    this.contractForm = this.formBuilder.group({
      clientId: [''],
      value: ['']
    });

    this.loadClients();
  }

  loadClients() {
    this.clientService.getAllClients().subscribe(
      (clients: ClientResponse[]) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Error loading clients', error.message);
      }
    );
  }

  onSubmit(): void {
    const contractRequest: ContractRequest = {
      clientId: this.contractForm.value.clientId,
      value: this.contractForm.value.value
    };

    this.contractService.generateContract(contractRequest).subscribe(
      (contractResponse) => {
        // Optional: Verarbeite die Antwort des Servers, z.B. zeige eine Erfolgsmeldung an
        console.log('request: ', contractRequest)
        console.log('Vertrag erfolgreich erstellt:', contractResponse);
        this.router.navigate(['/contracts']);
      },
      (error) => {
        // Optional: Verarbeite den Fehler, z.B. zeige eine Fehlermeldung an
        console.error('Fehler beim Erstellen des Vertrags:', error.message);
        alert('Fehler beim Erstellen des Vertrags');
      }
    );
  }

}
