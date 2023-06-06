import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from 'src/app/core/http/contract.service';
import { ClientResponse } from 'src/app/shared/models/client-response';
import { ContractResponse } from 'src/app/shared/models/contract-response';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent {
  contractId!: number;
  contract!: ContractResponse; // Stellen Sie sicher, dass Sie die User-Klasse entsprechend importiert haben

  constructor(private route: ActivatedRoute, private contractService: ContractService) { }

  ngOnInit(): void {
    const param=this.route.snapshot.paramMap.get('id');
    this.contractId = param?+param:0;; // Die 'id' ist der Pfadparameter, den Sie in der RouterLink-Anweisung festgelegt haben
    this.contractService.getContractById(this.contractId).subscribe((contract : ContractResponse) => {
      console.log(contract);
      this.contract = contract;
    });
  }
}
