import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(public authService: AuthenticationService) { }

}
