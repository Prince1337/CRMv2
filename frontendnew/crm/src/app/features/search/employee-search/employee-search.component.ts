import { Component } from '@angular/core';
import { ClientService } from 'src/app/core/http/client.service';
import { ClientResponse } from 'src/app/shared/models/client-response';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent {

  clients: ClientResponse[] = [];
  city: string = '';

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.defaultSearch();
  }

  defaultSearch(): void {
    this.clientService.getDefaultSearch()
      .subscribe((clients: ClientResponse[]) => {
        this.clients = clients;
      });
  }

  searchByCity(): void {
    if (this.city.trim() !== '') {
      this.clientService.searchByCity(this.city)
        .subscribe(clients => {
          this.clients = clients;
        });
    } else {
      this.defaultSearch();
    }
  }

  

}
