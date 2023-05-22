import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ContractService } from 'src/app/core/http/contract.service';
import { ContractRequest } from 'src/app/shared/models/contract-request';

@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrls: ['./contract-add.component.css']
})
export class ContractAddComponent {

  contractForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private contractService: ContractService) { }

  ngOnInit(): void {
    this.contractForm = this.formBuilder.group({
      clientId: [''],
      value: ['']
    });
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
      },
      (error) => {
        // Optional: Verarbeite den Fehler, z.B. zeige eine Fehlermeldung an
        console.error('Fehler beim Erstellen des Vertrags:', error.message);
      }
    );
  }

}
