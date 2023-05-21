import { Component } from '@angular/core';
import { ContractService } from 'src/app/core/http/contract.service';
import { ContractResponse } from 'src/app/shared/models/contract-response';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent {
  contracts!: ContractResponse[];

  constructor(private contractService: ContractService) { }

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts(): void {
    this.contractService.getAllContracts()
      .subscribe((contracts) => {
        this.contracts = contracts;
      }, (error) => {
        console.error(error.message);
      });
  }

  acceptContract(): void {
    const contractId = 252;
    this.contractService.acceptContract(contractId)
      .subscribe(() => {
        console.log('Contract accepted successfully');
      }, (error) => {
        console.error(error.message);
      });
  }

}
