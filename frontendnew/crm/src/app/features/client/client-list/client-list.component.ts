import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/core/http/client.service';
import { ClientResponse } from 'src/app/shared/models/client-response';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {

  clients!: ClientResponse[];

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.clientService.managerGetAllClients().subscribe(clients => {
      console.log(clients);
      this.clients = clients;
    });
  }

  editClient(clientId: number): void {
    this.router.navigate(['/clients/edit', clientId]);
  }

  deleteClient(clientId: number): void {
     this.clientService.deleteClient(clientId).subscribe(() => {
        this.clients = this.clients.filter(client => client.id !== clientId);
     });
  }
}

