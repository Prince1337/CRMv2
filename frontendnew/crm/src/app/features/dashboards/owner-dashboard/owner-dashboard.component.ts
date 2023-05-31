import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent {

  isAuthenticated: boolean = false;

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

}
