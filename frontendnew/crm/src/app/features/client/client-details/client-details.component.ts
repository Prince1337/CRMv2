import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/core/http/client.service';
import { UserService } from 'src/app/core/http/user.service';
import { ClientResponse } from 'src/app/shared/models/client-response';
import { UserDetailsResponse } from 'src/app/shared/models/user-details-response';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent {

  clientId!: number;
  client!: ClientResponse; // Stellen Sie sicher, dass Sie die User-Klasse entsprechend importiert haben

  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    const param=this.route.snapshot.paramMap.get('id');
    this.clientId = param?+param:0;; // Die 'id' ist der Pfadparameter, den Sie in der RouterLink-Anweisung festgelegt haben
    this.clientService.getClientById(this.clientId).subscribe((client : ClientResponse) => {
      console.log(client);
      this.client = client;
    });
  }

  editClient(clientId: number): void {
    this.router.navigate(['/clients/edit', clientId]);
  }

  deleteClient(clientId: number): void {
     
  }

}
