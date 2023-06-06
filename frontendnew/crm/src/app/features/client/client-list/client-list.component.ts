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

  
}

