import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/core/http/client.service';
import { ClientResponse } from 'src/app/shared/models/client-response';

@Component({
  selector: 'app-manager-search',
  templateUrl: './manager-search.component.html',
  styleUrls: ['./manager-search.component.css']
})
export class ManagerSearchComponent implements OnInit {

  city!: string;
  region!: string;
  name!: string;
  clients!: ClientResponse[];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  searchByCity(): void {
    this.clientService.managerSearchByCity(this.city)
      .subscribe(clients => this.clients = clients);
  }

  searchByRegion(): void {
    this.clientService.managerSearchByRegion(this.region)
      .subscribe(clients => this.clients = clients);
  }

  searchByName(): void {
    this.clientService.managerSearchByName(this.name)
      .subscribe(clients => this.clients = clients);
  }

  getAllClients(): void {
    this.clientService.managerGetAllClients()
      .subscribe(clients => this.clients = clients);
  }
}
