import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/auth.service';
import { ContractService } from 'src/app/core/http/contract.service';
import { ContractResponse } from 'src/app/shared/models/contract-response';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent {
  contracts!: ContractResponse[];
  userRole!: string;

  constructor(private contractService: ContractService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllContracts();
  }

  getAllContracts(): void {
    this.userRole = this.authService.userRole;
    
    if (this.userRole === 'EMPLOYEE') {
    this.contractService.getAllContracts()
      .subscribe((contracts) => {
        this.contracts = contracts;
      }, (error) => {
        console.error(error.message);
      });
    }
    else {
      this.contractService.getAllContractsAdmin()
        .subscribe((contracts) => {
          this.contracts = contracts;
        }, (error) => {
          console.error(error.message);
        });
    }

  }

  acceptContract(contractId: number): void {
    this.contractService.acceptContract(contractId)
      .subscribe(() => {
        console.log('Contract accepted successfully');
        this.ngOnInit();
      }, (error) => {
        console.error(error.message);
      });
  }

  printContract(contractId: number): void {
    
  }

}
