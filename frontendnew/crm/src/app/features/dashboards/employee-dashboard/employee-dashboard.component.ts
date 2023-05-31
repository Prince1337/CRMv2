import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent {
  
  isAuthenticated: boolean = false;

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

}
